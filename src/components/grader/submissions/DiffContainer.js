import React from "react";
import { Header } from "semantic-ui-react";
import SingleDiff from "./SingleDiff";
import { Accordion } from 'carbon-components-react';
//import { ModalWrapper } from 'carbon-components-react';


function DiffContainer(props) {

  return (
    <React.Fragment>
      <Header textAlign="center" as="h4" >
        Results diff are ready for view
      </Header>

      <Accordion align="start">
        {props.diff.map((result) => (
          result.failed.length > 0 &&
          <div>
            <SingleDiff result={result} key={result.id} />
          </div>


        ))}
      </Accordion>

      <br></br>

    </React.Fragment>
  );
}

export default DiffContainer;
