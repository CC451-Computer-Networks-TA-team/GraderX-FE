import React, { useState, useEffect } from 'react';
import MultiRef from 'react-multi-ref';
import { Tabs, Tab } from 'carbon-components-react';
import AceEditor from "react-ace";
import { ModalWrapper } from 'carbon-components-react';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-json";

import "ace-builds/src-noconflict/theme-dracula";
import 'ace-builds/src-min-noconflict/ext-searchbox';
import apiClient from "../../../api-client";
import './CodeEditor.scss'

function CodeEditor(props) {
    const [itemRefs] = useState(() => new MultiRef());
    const [tabRefs] = useState(() => new MultiRef());
    const [preValue, setPreValue] = useState("");
    // eslint-disable-next-line
    const [tabLabels, setTabLabels] = useState([])
    const [currentTab, setCurrentTab] = useState(0)
    const [currentTabLabel, setCurrentTabLabel] = useState(props.subList[0])
    // eslint-disable-next-line
    const [submissionFiles, setSubmissionFiles] = useState({})


    useEffect(() => {
        if (isEmpty()) {
            getSubmissionFile();
        }
        // eslint-disable-next-line
    }, [currentTab])


    function getLanguageMode(lang) {
        var ext = lang.substr(lang.lastIndexOf('.') + 1);
        switch (ext) {
            case 'py':
                return 'python';
            case 'c':
            case 'cc':
            case 'h':
            case 'hpp':
            case 'cpp':
                return 'c_cpp';
            case 'java':
                return 'java';
            case 'js':
                return 'javascript';
            case 'json':
                return 'json';
            case 'sql':
                return 'sql';
            default:
                return 'json';
        }
    }


    function isEmpty() {
        return itemRefs.map.get(currentTab).editor.getValue() === ''
    }

    function setEditor(editor, value) {
        editor.setValue(value)
    }

    function handleSelect(index) {
        setCurrentTab(index)
        setCurrentTabLabel(tabLabels[index])
    }



    function getFiles() {
        const formData = new FormData();
        for (let key in submissionFiles) {
            formData.append(key, new Blob([submissionFiles[key]], {
                type: "text/plain",
            }))
        }
        return formData
    }

    function getSubmissionFile() {
        apiClient
            .getFile(props.course, props.lab, props.submissionId, currentTabLabel, props.submissionKey)
            .then(res => {
                setEditor(itemRefs.map.get(currentTab).editor, res.data.file_content);
            })
    }


    function modifySubmissions(formData) {
        apiClient
            .modifySubmissions(props.course, props.lab, props.submissionId, formData, props.submissionKey)

    }

    function saveFiles() {
        if (submissionFiles) {
            const formData = getFiles();
            modifySubmissions(formData);
        }
        return true
    }


    function setTabLabel(theLabel, index) {
        tabLabels[index] = theLabel
        return theLabel
    }

    return (

        <ModalWrapper size='lg'
            buttonTriggerText="Edit Submission"
            modalHeading="Edit Mode"
            handleSubmit={saveFiles}
            className="code-editor-wrapper"
        >


            <Tabs light
                label="Files"
                onSelectionChange={handleSelect}
            >

                {props.subList.map((sub_id, index) => (

                    <Tab
                        href="#"
                        id={index}
                        label={setTabLabel(sub_id, index)}
                        ref={tabRefs.ref(index)}
                    >
                        <AceEditor
                            mode={getLanguageMode(sub_id)}
                            theme="dracula"
                            name="UNIQUE_ID_OF_DIV"
                            minLines="5"
                            maxLines="30"
                            ref={itemRefs.ref(index)}
                            style={{ width: "100%" }}
                            onChange={(newValue) => {
                                //check if not empty first
                                if (preValue !== "") {
                                    submissionFiles[sub_id] = newValue;
                                }
                                setPreValue(newValue)
                            }}
                        />
                    </Tab>

                ))}

            </Tabs>



        </ModalWrapper>
    )

}

export default CodeEditor;