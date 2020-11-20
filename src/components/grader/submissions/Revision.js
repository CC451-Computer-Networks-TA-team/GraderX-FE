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
        apiClient.getSubmissionFilesList(props.course, props.lab)
            .then(res => {
                setFileNameList(res.data)
            });
    }


    function getDiffResults() {

        apiClient.getDiffResults(props.course, props.lab)
            .then(res => {
                if (res) {
                    setDiff(res.data.diff)
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
                    style={{ marginBottom: "10px" }}>
                    {
                        fileNameList.map((item, index) => (
                            <div>
                                <SingleSubmission
                                    course={props.course}
                                    lab={props.lab}
                                    submissionId={item}
                                    diff={diff}
                                    index = {index}
                                />

                            </div>


                        ))
                    }

                </Accordion>}

        </div>
    )
}

export default Revision;
