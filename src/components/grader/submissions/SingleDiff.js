import ReactDiffViewer from "react-diff-viewer";
import React, {useState, useLayoutEffect} from "react";
import { AccordionItem, Tile } from 'carbon-components-react';
import CodeEditor from "./CodeEditor"
//import { ModalWrapper } from 'carbon-components-react';
import apiClient from "../../../api-client";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import 'ace-builds/src-min-noconflict/ext-searchbox';

const sub_list = [
  "main.py", "helper.py"
]
// const code_files =
// {
//   // eslint-disable-next-line
//   "main.py": "parents, babies = (1, 1)\n\
//   while babies < 100:\n\
//   print('This generation has {0} babies'.format(babies))\n\
//   parents, babies = (babies, parents + babies)",
//   // eslint-disable-next-line
//   "helper.py": "def greet(name):\n\
//   print ('Hello', name)\n\
// greet('Jack')\n\
// greet('Jill')\n\
// greet('Hagar')"
// }



function SingleDiff(props) {

  const [filesList, setFilesList] = useState([])
  const [theFile, setFile] = useState("")
  let fileList = []
  useLayoutEffect(() => {
    apiClient.getFilesList(props.course, props.lab, props.result.id)
    .then(res => {
        setFilesList(res.data)
        fileList = res.data;
    });

  }, [])

 
  return (
    <div>
      <AccordionItem
        title={props.result.id}
      >
       

          <CodeEditor
            subList={sub_list}
            defaultLabel={sub_list[0]}
            course={props.course}
            lab={props.lab}
            submissionId={props.result.id}
            theFile={theFile}
          />


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
