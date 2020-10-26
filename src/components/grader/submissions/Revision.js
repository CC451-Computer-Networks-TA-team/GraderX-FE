import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "carbon-components-react";
import apiClient from "../../../api-client";
import SingleSubmission from "./SingleSubmission"
import './Revision.scss'

function Revision(props) {

    const [fileNameList, setFileNameList] = useState();
    const [visible, setVisible] = useState(false);
    const [diff, setDiff] = useState();

    useEffect(() => {
        getSubmissionFilesList()
        getDiffResults();
        // eslint-disable-next-line 
    }, [])

    function getSubmissionFilesList() {
        apiClient.getSubmissionFilesList(props.course, props.lab, props.submissionKey)
            .then(res => {
                setFileNameList(res.data)
            });
    }


    function getDiffResults() {

        apiClient.getDiffResults(props.course, props.lab, props.submissionKey)
            .then(res => {
                if (res) {
                    setDiff(res.data)
                } else {
                    setDiff(false)
                }
            })
            .catch(function (error) { console.log(error) });

    }

    useEffect(() => {
        if (fileNameList)
            setVisible(true)

    }, [fileNameList, setFileNameList])

    return (


        <div>


            {visible &&
                <Accordion align="start"
                style= {{marginBottom:"10px"}}>
                    {
                        fileNameList.map((item) => (
                            <AccordionItem
                                title={item}
                            >
                                <SingleSubmission
                                    course={props.course}
                                    lab={props.lab}
                                    submissionId={item}
                                    diff={diff}
                                    submissionKey={props.submissionKey}
                                />
                            </AccordionItem>
                        ))
                    }

                </Accordion>}

        </div>
    )
}

export default Revision;
