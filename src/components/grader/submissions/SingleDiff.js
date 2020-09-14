import ReactDiffViewer from "react-diff-viewer";
import React from "react";
import { AccordionItem, Tile } from 'carbon-components-react';
import CodeEditor from "./CodeEditor"

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import 'ace-builds/src-min-noconflict/ext-searchbox';

const sub_list = [
  { "submssionFile": "main.py" },
  { "submssionFile": "helper.py" }

]

const code_files =
{
  "main.py": "print('Hi')",
  "helper.py": "print('Bye')"
}



function SingleDiff(props) {
  // const [tabState, setTab] = useState(true);
  //const [theTabs, setTabs] = useState([]);

  // function countMyTabs(theTabList) {
  //   console.log(theTabList.length)
  //   setTabs(Array.apply(null, Array(5)).map(function (x, i) { return i === 0 ? true : false }))

  // }

  // function handleChange(event) {
  //   console.log(event)
  //   //setValue("Some Text");
  // }
  return (
    <div>
      <AccordionItem
        title={props.result.id}
      >
        <CodeEditor subList={sub_list}
                    codeFiles={code_files}
                    defaultLabel={sub_list[0].submssionFile}
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
        {/* 
        <ModalWrapper size='sm'
          buttonTriggerText="Edit Submission"
          modalHeading="Edit Mode"
        >

          <Tabs >
           
            {sub_list.map((sub_id) => (
              <Tab
                href="#"
                id={sub_id.submssionFile}
                label={sub_id.submssionFile}
                onClick={console.log("Tab1")}

              >

                <AceEditor
                  mode="python"
                  theme="dracula"
                  name="UNIQUE_ID_OF_DIV"
                  value={code_files[sub_id.submssionFile]}
                  onChange={handleChange}

                />
              </Tab>


            ))}

          </Tabs>


        </ModalWrapper> */}
      </AccordionItem>


    </div>
  );
}

export default SingleDiff;
