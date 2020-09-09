import React from "react";
import fileDownload from "js-file-download";
import apiClient from "../../api-client";
import {  Header} from "semantic-ui-react";
import 'carbon-components/css/carbon-components.min.css';
import { Button, ModalWrapper } from 'carbon-components-react';

function DownloadResult(props) {
  function downloadFile() {
    apiClient.downloadResults(props.course, props.lab).then(res => {
      fileDownload(res.data, "results.zip");
    });
  }

  return (
    <React.Fragment>
      <Header textAlign="center" as="h4">
        Results are ready for download
      </Header>

      <Button  onClick={downloadFile}>
        DOWNLOAD
      </Button>
    </React.Fragment>
  );
}

export default DownloadResult;
