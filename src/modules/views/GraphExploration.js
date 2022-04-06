import React, { useState } from 'react'
import PropTypes from 'prop-types'

import axios from 'axios';

import Input from '../form/GraphInput'
import NeighborsGraphContainer from '../components/NeighborsGraphContainer'
import { Grid, Card, Typography, Tabs, Tab, } from '@material-ui/core';
import LateralView from '../components/LateralView';
import SearchBar from '../components/SearchBar';
import RecoGraphContainer from '../components/RecoGraphContainer';



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Typography component={'div'}>{children}</Typography>
        )}
      </div>
    );
}


function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


const getReferencesByDOI = async ( doi, setNeighbors ) => {

    const nodes = []
    const relations = []

    const token = localStorage.getItem('token')

    return axios.get(`/api/article/neighbors?doi=${doi}`, { headers:{'x-access-token': token}  }
    ).then(res => {

        setNeighbors(res.data)

        res.data.forEach(element => {
            const node = { data: { id: element.doi+element.title, label: element.title } }
            nodes.push( node )

            const edge = { data: { source: doi, target: element.doi+element.title, label: "cy" } }
            relations.push( edge )
        });

        return {nodes: nodes, edges : relations} 
    })
}

const GraphView = props => {

    const [doi, setDOI] = useState("10.1145/2462356.2462379")
    const[title, setTitle] = useState("")

    const [references, setReferences] = useState({});

    const [metadata, setMetadata] = useState({});
    const [neighbors, setNeighbors] = useState([]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const token = localStorage.getItem('token')
        const FirstLevelRefs = await getReferencesByDOI(doi, setNeighbors)

        axios.get(`/api/article?doi=${doi}`,  { headers:{'x-access-token': token} }
        ).then(res => {
            setTitle(res.data.title)
            setMetadata(res.data)

        })
        let nodesArray = [{ data: { id: doi, label: doi } }]
        let relationsArray = []
        nodesArray = nodesArray.concat( FirstLevelRefs.nodes )
        relationsArray = relationsArray.concat( FirstLevelRefs.edges )
       /*
        for (const element of FirstLevelRefs.nodes) {
            const SecondLevelRefs = await getReferencesByDOI(element.data.id)
            
            nodesArray = nodesArray.concat( SecondLevelRefs.nodes )
            relationsArray = relationsArray.concat( SecondLevelRefs.edges )
        }
*/

        setReferences({nodes: nodesArray, edges : relationsArray})


    } 

    const handleClick = async () => {

        const token = localStorage.getItem('token')
        const FirstLevelRefs = await getReferencesByDOI(doi, setNeighbors)

        axios.get(`/api/article?doi=${doi}`,  { headers:{'x-access-token': token} }
        ).then(res => {
            setTitle(res.data.title)
            setMetadata(res.data)

        })
        let nodesArray = [{ data: { id: doi, label: doi } }]
        let relationsArray = []
        nodesArray = nodesArray.concat( FirstLevelRefs.nodes )
        relationsArray = relationsArray.concat( FirstLevelRefs.edges )

        setReferences({nodes: nodesArray, edges : relationsArray})

    } 

    return (
        <div>
            <SearchBar onClick={handleClick} onChange={setDOI}></SearchBar>
            {<Input onSubmit={handleSubmit} onChange={setDOI} DOI={doi} />}

            <Grid container >

                <Grid item xs={4}>
                    <LateralView metadata={metadata} neighbors={neighbors} ></LateralView>
                </Grid>
                
                <Grid item xs={8}>
                    <Tabs value={value} onChange={handleChange} style={{ padding: 10, marginRight: -10, marginLeft: 30 }} variant="scrollable" scrollButtons="auto">
                        <Tab label="Neighbors Graph" {...a11yProps(0)} />
                        <Tab label="Recommandations Graph" {...a11yProps(1)} />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <NeighborsGraphContainer Title={title} GraphData={references}></NeighborsGraphContainer>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <RecoGraphContainer></RecoGraphContainer>
                    </TabPanel>

                </Grid>

            </Grid>

            

        </div>
    )
}

GraphView.propTypes = {

}

export default GraphView
