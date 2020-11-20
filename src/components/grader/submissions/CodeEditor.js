import React, { useState, useEffect } from 'react';
import MultiRef from 'react-multi-ref';
import { Tabs, Tab } from 'carbon-components-react';
import AceEditor from "react-ace";
import { Modal, Button } from 'carbon-components-react';
import { Edit16 } from '@carbon/icons-react';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-json";

import "ace-builds/src-noconflict/theme-dracula";
// import 'ace-builds/src-min-noconflict/ext-searchbox';
import apiClient from "../../../api-client";
import './CodeEditor.scss'

function CodeEditor(props) {
    const [openModal, setOpenModal] = useState(false);
    const [itemRefs] = useState(() => new MultiRef());
    const [tabRefs] = useState(() => new MultiRef());
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
            .getFile(props.course, props.lab, props.submissionId, currentTabLabel)
            .then(res => {
                setEditor(itemRefs.map.get(currentTab).editor, res.data.file_content);
            })
    }


    function modifySubmissions(formData) {
        apiClient
            .modifySubmissions(props.course, props.lab, props.submissionId, formData)
    }

    function saveFiles() {
        if (submissionFiles) {
            const formData = getFiles();
            modifySubmissions(formData);
        }

        // for regrading
        apiClient.startGrading(props.course, props.lab)
        props.regrade(true)
        return true
    }


    function setTabLabel(theLabel, index) {
        tabLabels[index] = theLabel
        return theLabel
    }

    return (
        <div>
            <Modal
                hasForm
                open={openModal}
                onRequestClose={() => {
                    setOpenModal(false);
                }}
                primaryButtonText='Save'
                secondaryButtonText='Close'
                onRequestSubmit={() => {
                    saveFiles();
                    setOpenModal(false);
                }}
                size='lg'
                modalHeading="Edit Mode"
            >
                <div>
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
                                        submissionFiles[sub_id] = newValue;
                                    }}
                                />
                            </Tab>

                        ))}
                    </Tabs>
                </div>
            </Modal>
            <Button renderIcon={Edit16} onClick={() => setOpenModal(true)}>
                Edit Submission
            </Button>
        </div>
    )

}

export default CodeEditor;