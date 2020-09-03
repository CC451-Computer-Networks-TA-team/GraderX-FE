import ReactDiffViewer from "react-diff-viewer";
import React from "react";
import AccordionSection from "@bit/nexxtway.react-rainbow.accordion-section";
import { Label } from "semantic-ui-react";

function SingleDiff(props) {
  return (
    <div>
      <AccordionSection
        label={props.result.id}
        style={{ marginBottom: "-30px" }}
      >
        {props.result.failed.map((res) => (
          <div key={res.tc_id} >
            <Label as="a" color="red" image>
              {res.tc_id}
              <Label.Detail>Test Case Id</Label.Detail>
            </Label>

            <hr></hr>
            <ReactDiffViewer leftTitle="Expected"
              rightTitle="Output"
              oldValue={res.expected}
              newValue={res.output}
            />

            <br></br>
          </div>
        ))}
      </AccordionSection>
    </div>
  );
}

export default SingleDiff;
