import React, { useEffect, useState } from "react";
import apiClient from "../../../api-client";
import CodeEditor from "./CodeEditor"
import ReactDiffViewer from "react-diff-viewer";
import { AccordionItem } from "carbon-components-react";




function SingleSubmission(props) {

    const [submissionFileList, setSubmissionFileList] = useState();
    const [visible, setVisible] = useState(false);

    function getFilesListForSubmission() {
        apiClient
            .getFilesList(props.course, props.lab, props.submissionId)
            .then(res => {
                setSubmissionFileList(res.data)
            })
    }

    useEffect(() => {
        getFilesListForSubmission()
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        if (submissionFileList)
            setVisible(true)

    }, [submissionFileList, setSubmissionFileList])

    return (

        <AccordionItem
            title={props.submissionId} >

            <div>
                {
                    props.diff &&
                    props.diff[props.index].failed.map((resp) => (
                        <div key={resp.tc_id} >
                            <h4>Test Case {resp.tc_id}</h4>
                            <hr></hr>
                            <ReactDiffViewer
                                leftTitle="Expected"
                                rightTitle="Output"
                                oldValue={resp.expected}
                                newValue={resp.output}
                                useDarkTheme={true}
                                className="single-diff-container"
                            />
                            <br></br>
                        </div>
                    ))

                }

                {visible &&
                    <CodeEditor
                        subList={submissionFileList}
                        course={props.course}
                        lab={props.lab}
                        submissionId={props.submissionId}
                    />
                }

            </div>





        </AccordionItem>

    )




}

export default SingleSubmission;
