import React, { useEffect, useState } from "react";
import apiClient from "../../../api-client";
import CodeEditor from "./CodeEditor"
import ReactDiffViewer from "react-diff-viewer";
import { Tile } from 'carbon-components-react';



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


        <div>

            {
                props.diff &&
                props.diff.map((res) => (
                    <div key={res.id} >
                        {res.failed.map((f) => (

                            <div key={f.tc_id} >
                                <Tile> Test Case {f.tc_id}</Tile>
                                <hr></hr>
                                <ReactDiffViewer
                                    leftTitle="Expected"
                                    rightTitle="Output"
                                    oldValue={f.expected}
                                    newValue={f.output}
                                    useDarkTheme={true}
                                />
                                <br></br>
                            </div>
                        ))}

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

    )




}

export default SingleSubmission;
