import React, { useState, useEffect, useRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";

import Cytoscape from 'cytoscape';
import spread from "cytoscape-spread";
import { Paper, Box} from "@material-ui/core";


Cytoscape.use(spread);

const NeighborsGraphContainer = props => {

  const [width, setWith] = useState("100%");
  const [height, setHeight] = useState("400px");
  

  const ref = useRef(null)

  const layout = {
    name: "random"
  };

  const styleSheet = [
    {
      selector: "node",
      style: {
        backgroundColor: "#4a56a6",
        width: 30,
        height: 30,
        label: "data(label)",

        // "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
        // "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
        // "text-valign": "center",
        // "text-halign": "center",
        "overlay-padding": "6px",
        "z-index": "10",
        //text props
        "text-outline-color": "#4a56a6",
        "text-outline-width": "2px",
        color: "white",
        fontSize: 10
      }
    },
    {
      selector: "node:selected",
      style: {
        "border-width": "3px",
        "border-color": "#AAD8FF",
        "border-opacity": "0.5",
        "background-color": "#77828C",
        width: 40,
        height: 40,
        //text props
        "text-outline-color": "#77828C",
        "text-outline-width": 3
      }
    },
    {
      selector: "node[type='device']",
      style: {
        shape: "rectangle"
      }
    },
    {
      selector: "edge",
      style: {
        width: 3,
        // "line-color": "#6774cb",
        "line-color": "#AAD8FF",
        "target-arrow-color": "#6774cb",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier"
      }
    }
  ];

  let myCyRef;

  useEffect(() => {
    setHeight(ref.current.clientHeight)
  }, []);


  return (
    <Box sx={{ flexWrap: 'wrap' }}>
      <Paper ref={ref} elevation={6} style={{ padding: 10, marginRight: 30, marginLeft: 30, marginBottom:30 }}>
        <h1>{props.Title}</h1>
        <div
          style={{
            border: "1px solid",
            backgroundColor: "#f5f6fe",
            borderRadius: "5px"
            
          }}
        >
          <CytoscapeComponent
            elements={CytoscapeComponent.normalizeElements(props.GraphData)}
            style={{ width: width, height: height }}
            layout={layout}
            zoomingEnabled={true}
            maxZoom={3}
            minZoom={0.1}
            autounselectify={false}
            boxSelectionEnabled={true}

            zoom={2}
            
            stylesheet={styleSheet}
            cy={cy => {
              myCyRef = cy;

              console.log("EVT", cy);

              cy.on('add', 'node', _evt => {
                cy.layout(layout).run()
                cy.fit()
              })

              cy.on("tap", "node", evt => {
                var node = evt.target;
                console.log("EVT", evt);
              });
              
            }}
            abc={console.log("myCyRef", myCyRef)}
            
          />
        </div>
      </Paper>
    </Box>
  );
}

export default NeighborsGraphContainer