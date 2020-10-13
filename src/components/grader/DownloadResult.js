import React from "react";
import fileDownload from "js-file-download";
//import apiClient from "../../api-client";
import { Button, Header } from "semantic-ui-react";
import GradingService from '../../services/GradingService'

function DownloadResult(props) {
  function downloadFile() {
    GradingService
      .downloadResults(props.course, props.lab).then(res => {
        fileDownload(res, "results.zip");
      });
  }

  return (
    <React.Fragment>
      <Header textAlign="center" as="h4">
        Results are ready for download
      </Header>
      <Button positive fluid onClick={downloadFile} style={{ marginBottom: "1%" }}>
        DOWNLOAD
      </Button>
    </React.Fragment>
  );
}

export default DownloadResult;
