import React, { useState } from 'react'
import PropTypes from 'prop-types'

import axios from 'axios';

import Input from '../form/GraphInput'
import GraphContainer from '../components/GraphContainer'

const getReferencesByDOI = async ( doi ) => {

    const nodes = []
    const relations = []

    return axios.get(`https://opencitations.net/index/coci/api/v1/references/${doi}`).then(res => {

        res.data.forEach(element => {
            const node = { data: { id: element.cited, label: element.cited } }
            nodes.push( node )

            const edge = { data: { source: doi, target: element.cited, label: "cy" } }
            relations.push( edge )
        });

        return {nodes: nodes, edges : relations} 
    })
}

const GraphView = props => {

    const [doi, setDOI] = useState("10.1038/339155a0");

    const [references, setReferences] = useState({});

    const [metadata, setMetadata] = useState({});

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let nodesArray = [{ data: { id: doi, label: doi } }]
        let relationsArray = []

        const FirstLevelRefs = await getReferencesByDOI(doi)

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

        axios.get(`https://opencitations.net/index/coci/api/v1/metadata/${doi}`).then(res => {
            
            setMetadata(res.data)

        })
    } 

    return (
        <div>
            <Input onSubmit={handleSubmit} onChange={setDOI} DOI={doi} />

            <GraphContainer Title={doi} GraphData={references}></GraphContainer>

            

        </div>
    )
}

GraphView.propTypes = {

}

export default GraphView
