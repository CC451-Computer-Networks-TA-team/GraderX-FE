import ReactDiffViewer from "react-diff-viewer";
import React from "react";
import { Label } from "semantic-ui-react";
import 'carbon-components/css/carbon-components.min.css';
import { AccordionItem, Tag } from 'carbon-components-react';
import 'carbon-components/css/carbon-components.min.css';
import { Button, ModalWrapper } from 'carbon-components-react';
import { Add16, Delete16 } from '@carbon/icons-react';
import AceEditor from "react-ace";


function SingleDiff(props) {
  console.log("editor")
  function show_editor() {
    return (
      <div>
        {/* <ModalWrapper
          buttonTriggerText="Get Results"
          modalHeading="Results"
          modalLabel="analyze"
          alert={true}
          primaryButtonText="Download b2a"
          onRequestSubmit={console.log("requested")}
          passiveModal={false}
          onSecondarySubmit={console.log("cancelled")}
        >
          <Button size="field"> Click Me </Button> Hi

        <AceEditor
            mode="java"
            theme="tomorrow_night_blue"
            setReadOnly={false}
            style={{ height: '400px' }}
            value="printf"
          //onChange={onChange}
          />

        </ModalWrapper> */}
      </div>

    )
  }

  return (
    <div>
      <AccordionItem
        title={props.result.id}
        onClick={show_editor}
      >
        {props.result.failed.map((res) => (
          <div key={res.tc_id} >
            <Label as="a" color="red" image>
              {res.tc_id}
              <Label.Detail>Test Case Id</Label.Detail>
            </Label>
            <Tag type="red" title="Test Case Id"> {res.tc_id} </Tag>
            <Tag type="red" title="Test Case Id"> Test Case {res.tc_id} </Tag>
            <hr></hr>
            <ReactDiffViewer leftTitle="Expected"
              rightTitle="Output"
              oldValue={res.expected}
              newValue={res.output}
             
            />

            <br></br>
          </div>
        ))}
      </AccordionItem>


    </div>
  );
}

export default SingleDiff;
