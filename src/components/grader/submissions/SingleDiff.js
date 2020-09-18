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
      console.log(theList)
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
