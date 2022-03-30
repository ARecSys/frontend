import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Paper, Tabs, Tab, Typography, Box } from "@material-ui/core";
import FavList from './FavList';
import NeighborList from './NeighborsList';


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

const LateralView = props => {
    //const [doi, setDOI] = useState("");
    const [height, setHeight] = useState("400px");
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //const [metadata, setMetadata] = useState();
    const ref = useRef(null)

    useEffect(() => {
        setHeight(ref.current.clientHeight)
      }, []);

    const NeighborsList =  props.neighbors.map(element => 
        <>
        <h2>Title</h2>

        { element.title?  JSON.stringify(element.title) : ""}

        <h3>Authors</h3>

        { element.authors?  JSON.stringify(element.authors) : ""}
        </>
    )
    

    return (
        <Box sx={{ flexWrap: 'wrap' }}>
        <Tabs value={value} onChange={handleChange} style={{ padding: 10, marginRight: -10, marginLeft: 30 }} variant="scrollable" scrollButtons="auto">
            <Tab label="Article Metadata" {...a11yProps(0)} />
            <Tab label="Neighbors" {...a11yProps(1)} />
            <Tab label="Favorites" {...a11yProps(2)} />
        </Tabs>
        

        <TabPanel value={value} index={0}>
            <Paper ref={ref} elevation={6} style={{ padding: 10, marginRight: -10, marginLeft: 30 }}>
                
                { (props.metadata.title || props.metadata.authors) ?  <h1>Article's Metadata</h1> : <div/>}

                { props.metadata.title? <div> <h2>Title</h2> {JSON.stringify(props.metadata.title)} </div>: <div/>}


                { props.metadata.authors? <div> <h2>Author(s)</h2> {JSON.stringify(props.metadata.authors)}</div>  : <div/>}

                

                { props.metadata.fos? <div> <h2>Fields of Study</h2> {JSON.stringify(props.metadata.fos)} </div>  : <div/>}

            </Paper>
        </TabPanel>

        <TabPanel value={value} index={1}>
            <NeighborList neighbors={props.neighbors}></NeighborList>
        </TabPanel>

        <TabPanel value={value} index={2}>
            <FavList></FavList>
        </TabPanel>
            
        </Box>
        
    )
}

LateralView.propTypes = {

}

export default LateralView
