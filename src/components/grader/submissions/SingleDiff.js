import ReactDiffViewer from "react-diff-viewer";
import React from "react";
import { Label } from "semantic-ui-react";
import 'carbon-components/css/carbon-components.min.css';
import { AccordionItem, Tag } from 'carbon-components-react';

function SingleDiff(props) {
  return (
    <div>
      <AccordionItem
        title={props.result.id}
      >
        {props.result.failed.map((res) => (
          <div key={res.tc_id} >
            <Label as="a" color="red" image>
              {res.tc_id}
              <Label.Detail>Test Case Id</Label.Detail>
            </Label>
            <Tag type="blue" title="Test Case Id"> {res.tc_id} </Tag>
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
