import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Paper, Tabs, Tab, Typography } from "@material-ui/core";


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
            <Typography>{children}</Typography>
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
        <>
        <Tabs value={value} onChange={handleChange} style={{ padding: 10, marginRight: -10, marginLeft: 30 }}>
            <Tab label="Article Metadata" {...a11yProps(0)} />
            <Tab label="Neighbors" {...a11yProps(1)} />
        </Tabs>
        

        <TabPanel value={value} index={0}>
            <Paper ref={ref} elevation={6} style={{ padding: 10, marginRight: -10, marginLeft: 30 }}>
                <h1>Article's Metadata</h1>

                <h2>Title</h2>

                { props.metadata.title?  JSON.stringify(props.metadata.title) : ""}

                <h2>Author</h2>

                { props.metadata.authors?  JSON.stringify(props.metadata.authors) : ""}

                <h2>Fields of Study</h2>

                { props.metadata.fos?  JSON.stringify(props.metadata.fos) : ""}

            </Paper>
        </TabPanel>

        <TabPanel value={value} index={1}>
            <Paper ref={ref} elevation={6} style={{ padding: 10, marginRight: -10, marginLeft: 30, maxHeight: 400, overflow: 'scroll' }}>
                { NeighborsList }
            </Paper>
        </TabPanel>
            
        </>
        
    )
}

LateralView.propTypes = {

}

export default LateralView
