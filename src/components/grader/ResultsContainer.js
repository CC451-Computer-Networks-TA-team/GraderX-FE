import React from "react";
import DownloadResult from "./DownloadResult";
import DiffContainer from "./submissions/DiffContainer"
import { Header } from "semantic-ui-react";
import { Button } from 'carbon-components-react';
import { ArrowLeft32 } from '@carbon/icons-react';
//import AceEditor from "react-ace";

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
      <Button size='inline' kind='secondary' onClick={props.getDiffResults} style={{ visibility: props.course === "test_course" ? 'visible' : 'hidden' }} >SHOW DIFFERENCES</Button>

      <Button kind="ghost" renderIcon={ArrowLeft32}
        onClick={props.resetLab}>
        Select another lab
        </Button>

    </React.Fragment>
  );
}

export default ResultsContainer;
