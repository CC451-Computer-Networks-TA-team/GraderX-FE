import React from "react";
import fileDownload from "js-file-download";
import apiClient from "../../api-client";
import { Header } from "semantic-ui-react";
import 'carbon-components/css/carbon-components.min.css';
import { Button, ModalWrapper } from 'carbon-components-react';
import { Add16, Delete16 } from '@carbon/icons-react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import ReactAce from 'react-ace-editor';

function onChange(newValue) {
  console.log("change", newValue);
}

function DownloadResult(props) {
  function downloadFile() {
    apiClient.downloadResults(props.course, props.lab).then(res => {
      fileDownload(res.data, "results.zip");
    });
  }

 
  return (
    <React.Fragment>
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
          onChange={onChange}
        />
      </ModalWrapper> */}

      <Header textAlign="center" as="h4">
        Results are ready for download
      </Header>

      <Button onClick={downloadFile}>
        DOWNLOAD
      </Button>
    </React.Fragment>
  );
}

export default DownloadResult;
