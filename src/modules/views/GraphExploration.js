import React, { useState } from 'react'
import PropTypes from 'prop-types'

import axios from 'axios';

import Input from '../form/GraphInput'
import GraphContainer from '../components/GraphContainer'
import { Grid, Card, Typography } from '@material-ui/core';
import LateralView from '../components/LateralView';

const getReferencesByDOI = async ( doi, setNeighbors ) => {

    const nodes = []
    const relations = []

    const token = localStorage.getItem('token')

    return axios.get(`/api/article/neighbors?doi=${doi}`, { headers:{'x-access-token': token}  }
    ).then(res => {

        setNeighbors(res.data)

        res.data.forEach(element => {
            const node = { data: { id: element.doi, label: element.title } }
            nodes.push( node )

            const edge = { data: { source: doi, target: element.doi, label: "cy" } }
            relations.push( edge )
        });

        return {nodes: nodes, edges : relations} 
    })
}

const GraphView = props => {

    //const [doi, setDOI] = useState("10.1038/339155a0");

    const [doi, setDOI] = useState("10.1145/2462356.2462379")
    const[title, setTitle] = useState("")

    const [references, setReferences] = useState({});

    const [metadata, setMetadata] = useState({});
    const [neighbors, setNeighbors] = useState([]);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let nodesArray = [{ data: { id: doi, label: doi } }]
        let relationsArray = []
        const token = localStorage.getItem('token')

        const FirstLevelRefs = await getReferencesByDOI(doi, setNeighbors)

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

        axios.get(`/api/article?doi=${doi}`,  { headers:{'x-access-token': token} }
        ).then(res => {
            setTitle(res.data.title)
            setMetadata(res.data)

        })
    } 

    return (
        <div>
            <Input onSubmit={handleSubmit} onChange={setDOI} DOI={doi} />

            <Grid container >

                <Grid item xs={4}>
                    <LateralView metadata={metadata} neighbors={neighbors} ></LateralView>
                </Grid>
                
                
                <Grid item xs={8}>
                    <GraphContainer Title={title} GraphData={references}></GraphContainer>
                </Grid>

            </Grid>

            

        </div>
    )
}

GraphView.propTypes = {

}

export default GraphView
