import React from "react";
import DownloadResult from "./DownloadResult";
import DiffContainer from "./submissions/DiffContainer"
import { Header, Icon } from "semantic-ui-react";
import 'carbon-components/css/carbon-components.min.css';
import { Button, ModalWrapper } from 'carbon-components-react';
import { Add16, Delete16, PreviousFilled32, PreviousOutline32 } from '@carbon/icons-react';
import AceEditor from "react-ace";

function ResultsContainer(props) {

  function onChange(newValue) {
    console.log("change", newValue);
  }
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
      <Button kind='secondary' onClick={props.getDiffResults} style={{ visibility: props.course === "test_course" ? 'visible' : 'hidden' }} >SHOW DIFFERENCES</Button>
      <Button renderIcon={Add16}>Button</Button>
      <ModalWrapper
        buttonTriggerText="Get Results"
        modalHeading="Results"
        modalLabel="analyze"
        alert={true}
        primaryButtonText="Download b2a"
        onRequestSubmit={console.log("requested")}
        passiveModal={false}
        onSecondarySubmit={console.log("cancelled")}
      >

        <AceEditor
          mode="java"
          theme="tomorrow_night_blue"
          setReadOnly={false}
          style={{ height: '400px' }}
          value="printf"
        //onChange={onChange}
        />

      </ModalWrapper>
      <Header as="h5" textAlign="center">


        <Button kind="ghost" renderIcon={PreviousOutline32}
          onClick={props.resetLab}>
          Select another lab
        </Button>

      </Header>
    </React.Fragment>
  );
}

export default ResultsContainer;
