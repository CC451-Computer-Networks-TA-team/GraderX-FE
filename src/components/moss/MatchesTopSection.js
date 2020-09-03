import React, {useState, useEffect} from 'react'
import ReactHtmlParser from 'react-html-parser'
import axios from 'axios'

const MatchesTopSection = (props) => {
    const [topSection, setTopSection] = useState("")

    useEffect(() => {
        axios.get(props.link).then(res => {
            setTopSection(ReactHtmlParser(res.data, {transform: (node, index) => {
                if(node.type === 'tag' && ["html", "body"].includes(node.name)){
                    node.name = "div"
                }
            }}))
        })
    }, [])

    return (
        <div>
            {
                topSection
            }
        </div>
    )
}

export default MatchesTopSection
