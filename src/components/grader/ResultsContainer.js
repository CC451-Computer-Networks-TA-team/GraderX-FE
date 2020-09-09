import React from "react";
import DownloadResult from "./DownloadResult";
import DiffContainer from "./submissions/DiffContainer"
import {Header, Icon } from "semantic-ui-react";
import 'carbon-components/css/carbon-components.min.css';
import { Button } from 'carbon-components-react';
import { Add16 } from '@carbon/icons-react';
//import { Button } from 'carbon-components-react';


function ResultsContainer(props) {


  return (
    <React.Fragment>
      <Header textAlign="center" as="h4" style={{ color: "Black" }}>
        Here are the Results !
        </Header>

      {
      props.diff
        ? <div>
          <DiffContainer course={props.course} lab={props.lab} diff={props.diff} />
          <DownloadResult course={props.course} lab={props.lab} resetLab={props.resetLab} getDiffResults={props.getDiffResults} />
          </div>
        : <div>
            <DownloadResult course={props.course} lab={props.lab} resetLab={props.resetLab} getDiffResults={props.getDiffResults} />
          </div>
      }
     
        {/* visible based on the course */}
       {/* <Button positive fluid onClick={props.getDiffResults} style={{visibility: props.course === "test_course"? 'visible' : 'hidden' }} >SHOW DIFFERENCES</Button> */}
       <Button   kind='secondary' onClick={props.getDiffResults} style={{visibility: props.course === "test_course"? 'visible' : 'hidden' }} >SHOW DIFFERENCES</Button>

       <Header as="h5" textAlign="center">
        <a
          href={() => false}
          style={{ cursor: "pointer" }}
          onClick={props.resetLab}
        >
          {/* <Icon name="chevron left" style={{ marginRight: ".4em" }} /> */}
          Select another lab
        </a>
      </Header>
    </React.Fragment>
  );
}

export default ResultsContainer;
