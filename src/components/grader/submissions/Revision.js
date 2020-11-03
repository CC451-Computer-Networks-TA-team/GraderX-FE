import React, { useEffect, useState } from "react";
import { Accordion, Button } from "carbon-components-react";
import apiClient from "../../../api-client";
import SingleSubmission from "./SingleSubmission"
import { Reset32 } from '@carbon/icons-react';
import './Revision.scss'

function Revision(props) {

    const [fileNameList, setFileNameList] = useState();
    const [visible, setVisible] = useState(false);
    const [diff, setDiff] = useState();
    const [update, setUpdate] = useState(0)

    useEffect(() => {
        getSubmissionFilesList()
        getDiffResults(); 
    }, [update])


    useEffect(() => {
        if (fileNameList)
            setVisible(true)

    }, [fileNameList, setFileNameList])

    function getSubmissionFilesList() {
        apiClient.getSubmissionFilesList(props.course, props.lab)
            .then(res => {
                setFileNameList(res.data)
            });
    }


    function getDiffResults() {

        apiClient.getDiffResults(props.course, props.lab)
            .then(res => {
                if (res) {
                    setDiff(res.data)
                } else {
                    setDiff(false)
                }
            })
            .catch(function (error) { console.log(error) });

    }

    function regradeSubmissions(){
        setUpdate(update => ++update);
    }
  
  

    return (
        <div>
            {visible &&
                <Accordion align="start"
                    style={{ marginBottom: "10px" }}>
                    {
                        fileNameList.map((item, index) => (
                            <div>
                                <SingleSubmission
                                    course={props.course}
                                    lab={props.lab}
                                    submissionId={item}
                                    diff={diff}
                                    index={index}
                                />

                            </div>
                        ))
                    }

                </Accordion>}
            <Button kind="secondary" 
                    renderIcon={Reset32} 
                    onClick={regradeSubmissions} 
                    style={{float:"left"}}>REGRADE AND SHOW RESULTS </Button> 
        </div>
    )
}

export default Revision;
