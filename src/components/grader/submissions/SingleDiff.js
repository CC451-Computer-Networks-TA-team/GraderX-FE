import ReactDiffViewer from "react-diff-viewer";
import React, { useState, useEffect } from "react";
import { AccordionItem, Tile } from 'carbon-components-react';
import CodeEditor from "./CodeEditor"
import apiClient from "../../../api-client";


function SingleDiff(props) {

  const [theList, setTheList] = useState([])
  const [visible, setVisible] = useState(false)


  useEffect(() => {
    apiClient.getFilesList(props.course, props.lab, props.result.id)
      .then(res => {
        setTheList(res.data)
      });
// eslint-disable-next-line
  }, [])


  useEffect(() => {
   
    if(theList.length > 0) {
      setVisible(true)
    }


  }, [theList])

  return (
    <div>
      <AccordionItem
        title={props.result.id}
      >
        {
          visible &&
          <CodeEditor
            subList={theList}
            course={props.course}
            lab={props.lab}
            submissionId={props.result.id}
          />
        }

        {props.result.failed.map((res) => (
          <div key={res.tc_id} >
            <Tile> Test Case {res.tc_id}</Tile>
            <hr></hr>

            <ReactDiffViewer
              leftTitle="Expected"
              rightTitle="Output"
              oldValue={res.expected}
              newValue={res.output}
              useDarkTheme={true}
            //styles={newStyles}
            />
            <br></br>
          </div>
        ))}

        {/* <CodeEditor subList={sub_list}
            codeFiles={code_files}
            defaultLabel={sub_list[0].submssionFile}
          /> */}

      </AccordionItem>


    </div>
  );
}

export default SingleDiff;


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
