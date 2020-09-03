import React, { useState, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Grid, Button, Icon, Segment } from 'semantic-ui-react'
import FakeAnchor from './FakeAnchor'
import MatchesCodeSection from './MatchesCodeSection'
import MatchesTopSection from './MatchesTopSection'
import axios from 'axios'

const MossInterface = (props) => {
    const [mossCurrentPage, setMossCurrentPage] = useState("")
    const [mossResultId, setMossResultId] = useState("")

    // const openLink = (link) =>{
    //     axios.get(link).then(res => {
    //         setMossCurrentPage(ReactHtmlParser(res.data), {transform: (node, index) => {
    //             if (node.type === 'tag' && node.name === 'a') {
    //                 return <FakeAnchor content={node.children[0].data} link={node.attribs.href} openLink={openLink}/>;
    //             }
    //         }})
    //     })
    // }

    const openLink = (link) => {
        let matches = link.match(/results\/\d\/\d{8,15}\/(match\d+)\.html/)

        if (matches) {
            setMossCurrentPage(
                <React.Fragment>
                    <Grid.Row centered>
                        <Grid.Column width={14}>
                            <Button compact secondary onClick={() => { openLink(props.moss_link) }}>
                                <Icon name="chevron left" style={{ marginRight: ".4em" }} />Back
                                </Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column>
                            <MatchesTopSection link={`${props.moss_link}/${matches[1]}-top.html`} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid>
                        <Grid.Row centered columns={2}>
                            <Grid.Column width={7} textAlign="left">
                                <Segment raised>
                                    <MatchesCodeSection link={`${props.moss_link}/${matches[1]}-0.html`} />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={7} textAlign="left">
                                <Segment raised>
                                    <MatchesCodeSection link={`${props.moss_link}/${matches[1]}-1.html`} />
                                </Segment>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </React.Fragment>
            )
        } else if (/results\/\d\/(\d{8,15}|\d{8,15}\/)$/.test(link)) {
            axios.get(`${props.moss_link}`).then(res => {
                setMossCurrentPage(
                    <Grid.Column width={8}>
                        <Segment raised padded>
                            {ReactHtmlParser(res.data, {
                                transform: (node, index) => {
                                    if (node.type === 'tag' && node.name === 'a') {
                                        return <FakeAnchor content={node.children[0].data} link={node.attribs.href} openLink={openLink} />;
                                    }
                                }
                            })}
                        </Segment>
                    </Grid.Column>

                )
            })
        }
    }

    useEffect(() => {
        // Extracts the id from the url with a regex
        // setMossResultId(props.moss_link.match(/results\/\d\/(\d{13})/)[1])
        // axios.get(`${props.moss_link}`).then(res => {
        //     setMossCurrentPage(ReactHtmlParser(res.data, {
        //         transform: (node, index) => {
        //             if (node.type === 'tag' && node.name === 'a') {
        //                 return <FakeAnchor content={node.children[0].data} link={node.attribs.href} openLink={openLink} />;
        //             }
        //         }
        //     }))
        // })
        openLink(props.moss_link)
    }, [])

    // useEffect(() => {
    //     console.log(mossIndex)
    // }, [mossIndex])

    return (
        <React.Fragment>
            {mossCurrentPage}
        </React.Fragment>
    )
}

export default MossInterface
