// import React, { useState, useRef } from "react";
import React, { useState, useEffect} from 'react';
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


function CodeEditor(props) {
    const [itemRefs] = useState(() => new MultiRef());
    const [tabRefs] = useState(() => new MultiRef());
    const [preVal, setPreVal] = useState("");
    // eslint-disable-next-line
    const [theLabels, setTheLabels] = useState([])
    const [currentTab, setCurrentTab] = useState(0)
    const [currentTabLabel, setCurrentTabLabel] = useState(props.subList[0])
    // eslint-disable-next-line
    const [submissionFiles, setSubmissionFiles] = useState({})
    //const countRenderRef = useRef(1);

    // useEffect(function afterRender() {
    //     countRenderRef.current++;
    //     console.log(countRenderRef)
    // });

    useEffect(() => {
        if (isEmpty()) {
            // fetch file here 
            apiClient.getFile(props.course, props.lab, props.submissionId, currentTabLabel)
                .then(res => {
                    console.log(res.data);
                    setEditor(itemRefs.map.get(currentTab).editor, res.data);
                });

            }
        // eslint-disable-next-line
    }, [currentTab])


    function isEmpty() {
        return itemRefs.map.get(currentTab).editor.getValue() === ''
    }

    function setEditor(editor, value) {
        editor.setValue(value)
    }

    function handleSelect(index) {
        setCurrentTab(index)
        setCurrentTabLabel(theLabels[index])
    }



    function getFiles() {
        const formData = new FormData();
        for (let key in submissionFiles) {
            console.log(key, submissionFiles[key]);
            formData.append(key, new Blob([submissionFiles[key]], {
                type: "text/plain",
            }))
        }
        return formData
    }

    function saveFiles() {
        if (submissionFiles) {
            const formData = getFiles();
            apiClient.modifySubmissions(props.course, props.lab, props.submissionId, formData)
                .then(res => {
                    console.log(res)
                });
        }
        return true
    }


    function setTabLabel(theLabel, index) {
        //handle if exists
        theLabels[index] = theLabel
        return theLabel
    }

    return (

        <ModalWrapper size='sm'
            buttonTriggerText="Edit Submission"
            modalHeading="Edit Mode"
            handleSubmit={saveFiles}
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
                            mode="python"
                            theme="dracula"
                            name="UNIQUE_ID_OF_DIV"
                            minLines="5"
                            maxLines="20"
                            ref={itemRefs.ref(index)}
                            onChange={(newValue) => {
                                //check if not empty first
                                if (preVal !== "") {
                                    submissionFiles[sub_id] = newValue;
                                }
                                setPreVal(newValue)
                            }}
                        />
                    </Tab>

                ))}

            </Tabs>
            <br />
        </ModalWrapper>
    )

}

export default CodeEditor;


// const newStyles = {
//     variables: {
//         light: {
//             diffViewerBackground: '#fff',
//             diffViewerColor: '212529',
//             addedBackground: '#e6ffed',
//             addedColor: '#24292e',
//             removedBackground: '#ffeef0',
//             removedColor: '#24292e',
//             wordAddedBackground: '#acf2bd',
//             wordRemovedBackground: '#fdb8c0',
//             addedGutterBackground: '#cdffd8',
//             removedGutterBackground: '#ffdce0',
//             gutterBackground: '#f7f7f7',
//             gutterBackgroundDark: '#f3f1f1',
//             highlightBackground: '#fffbdd',
//             highlightGutterBackground: '#fff5b1',
//             codeFoldGutterBackground: '#dbedff',
//             codeFoldBackground: '#f1f8ff',
//             emptyLineBackground: '#fafbfc',
//             gutterColor: '#212529',
//             addedGutterColor: '#212529',
//             removedGutterColor: '#212529',
//             codeFoldContentColor: '#212529',
//             diffViewerTitleBackground: '#fafbfc',
//             diffViewerTitleColor: '#212529',
//             diffViewerTitleBorderColor: '#eee',
//         },
//         dark: {
//             diffViewerBackground: '#2e303c',
//             diffViewerColor: '#FFF',
//             addedBackground: '#044B53',
//             addedColor: 'white',
//             removedBackground: '#632F34',
//             removedColor: 'white',
//             wordAddedBackground: '#055d67',
//             wordRemovedBackground: '#7d383f',
//             addedGutterBackground: '#034148',
//             removedGutterBackground: '#632b30',
//             gutterBackground: '#2c2f3a',
//             gutterBackgroundDark: '#262933',
//             highlightBackground: '#2a3967',
//             highlightGutterBackground: '#2d4077',
//             codeFoldGutterBackground: '#21232b',
//             codeFoldBackground: '#262831',
//             emptyLineBackground: '#363946',
//             gutterColor: '#464c67',
//             addedGutterColor: '#8c8c8c',
//             removedGutterColor: '#8c8c8c',
//             codeFoldContentColor: '#555a7b',
//             diffViewerTitleBackground: '#2f323e',
//             diffViewerTitleColor: '#555a7b',
//             diffViewerTitleBorderColor: '#353846',
//         }
//     }
// }
