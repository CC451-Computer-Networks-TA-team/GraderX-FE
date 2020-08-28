import React from "react";
import { Header, Button } from "semantic-ui-react";
import SingleDiff from "./SingleDiff";
//import Card from "@bit/nexxtway.react-rainbow.card";
import Accordion from "@bit/nexxtway.react-rainbow.accordion";


function DiffContainer(props) {

  // TODO: route to downloads
  function handleClick() {
    console.log("you clicked me!")
  }


  return (
    <React.Fragment>
      <Header textAlign="center" as="h4" style={{ color: "Black" }}>
        Results diff are ready for view        
      </Header>

      <Accordion id="accordion-1">
        {props.diff.map((result) => (
          <SingleDiff result={result} key={result.id}/>
        ))}
      </Accordion>

      <br></br>
      <Button positive fluid onClick={handleClick}>Go to Downloads</Button>
    
    </React.Fragment>
  );
}

export default DiffContainer;
