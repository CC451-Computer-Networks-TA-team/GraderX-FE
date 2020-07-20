import React from "react";
import fileDownload from "js-file-download";
import apiClient from "../../api-client";
import { Button, Header, Icon } from "semantic-ui-react";

function DownloadResult(props) {
  function downloadFile() {
    apiClient.downloadResults(props.lab).then(res => {
      let resFile = new File([res.data], "results.txt", {
        type: "text/plain"
      });
      fileDownload(resFile, "results.txt");
    });
  }

  return (
    <React.Fragment>
      <Header textAlign="center" as="h4">
        Results are ready for download
      </Header>
      <Button positive fluid onClick={downloadFile}>
        DOWNLOAD
      </Button>
      <Header as="h5" textAlign="center">
        <a
          href={() => false}
          style={{ cursor: "pointer" }}
          onClick={props.resetLab}
        >
          <Icon name="chevron left" style={{ marginRight: ".4em" }} />
          Select another lab
        </a>
      </Header>
    </React.Fragment>
  );
}

export default DownloadResult;
