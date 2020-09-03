import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import {Dimmer, Loader, Grid} from 'semantic-ui-react'

const MatchesCodeSection = (props) => {
    const [codeSection, setCodeSection] = useState("")
    const colorConversion = {
        '#FF0000': "#d32f2f",
        '#00FF00': "#43a047",
        "#0000FF": "#303f9f",
        "#00FFFF": "#26c6da"
    }

    useEffect(() => {
        axios.get(props.link).then(res => {
            setCodeSection(ReactHtmlParser(res.data, {transform: (node, index) => {
                if(node.type === 'tag' && ["html", "body"].includes(node.name)){
                    node.name = "div"
                }else if(node.type === 'tag' && node.name === "font"){
                    node.attribs.color = colorConversion[node.attribs.color]
                }
            }}))
        })
    }, [])
    // useEffect(() => {
    //     axios.get(props.link).then(res => {
    //         let includedNodes = ReactHtmlParser(res.data)
    //         console.log(includedNodes)
    //         setIncludedNodes(includedNodes)
    //     })
    // }, [])
    

    return (
        <div style={{overflow: "scroll",overflowX: "scroll", height: "500px"}}>
            {
                codeSection ? 
                (codeSection):
                (
                    <Grid.Row>
                        <Grid.Column centered width={7}>
                            <Dimmer active inverted>
                                <Loader inverted>Loading</Loader>
                            </Dimmer>)
                        </Grid.Column>
                    </Grid.Row>
                )
            }
        </div>
    )
}

export default MatchesCodeSection
