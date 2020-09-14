// import React, { useState, useRef } from "react";
import React, { useState } from 'react';
import MultiRef from 'react-multi-ref';
import { Tabs, Tab, ModalWrapper, Button } from 'carbon-components-react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import 'ace-builds/src-min-noconflict/ext-searchbox';




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


function CodeEditor(props) {
    const [itemRefs] = useState(() => new MultiRef());
    const [tabRefs] = useState(() => new MultiRef());
    const [theTab, setTab] = useState(Array.apply(null, Array(props.subList.length)).
        map(function (x, i) { return i === 0 ? true : false }));
    const [currentTab, setCurrentTab] = useState(0)
    const [currentTabLabel, setCurrentTabLabel] = useState(props.defaultLabel)
    const [EmptyEditor, setEmptyEditor] = useState(true)
    const [firstTime, setFirstTime] = useState(true)



    function onClick() {
        const editors = [];
        itemRefs.map.forEach(input => {

            editors.push(input)
        });
        if (editors[currentTab].editor.getValue() === "") {
            editors[currentTab].editor.setValue(props.codeFiles[currentTabLabel])
            setEmptyEditor(false)

        }


    }

    function handleSelect(index) {
        setCurrentTab(index)
        setCurrentTabLabel(document.getElementById(index).textContent)

    }

    function handleValue(index) {
        if (firstTime) {
            if (index === 0) {
                setFirstTime(false)
                return props.codeFiles[currentTabLabel]
            }

        }

        return null

    }

    return (
        <div>

            <ModalWrapper size='sm'
                buttonTriggerText="Edit Submission"
                modalHeading="Edit Mode"
            >

                <Tabs light
                    label="Files"
                    onSelectionChange={handleSelect}
                >
                    {/* state array */}
                    {/* {countMyTabs(sub_list)} */}

                    {props.subList.map((sub_id, index) => (

                        <Tab
                            href="#"
                            id={index}
                            label={sub_id.submssionFile}
                            ref={tabRefs.ref(index)}
                        //onClick={setCurrentTabLabel(this.label)}

                        >
                            <AceEditor
                                mode="python"
                                theme="dracula"
                                name="UNIQUE_ID_OF_DIV"
                                //placeholder={EmptyEditor?"click to reveal file":""}
                                //value={props.codeFiles[sub_id.submssionFile]}
                                value=""
                                onFocus={onClick}
                                //onChange={handleState}
                                ref={itemRefs.ref(index)}
                            />
                        </Tab>

                    ))}

                </Tabs>


            </ModalWrapper>
        </div>
    )

}

export default CodeEditor;
