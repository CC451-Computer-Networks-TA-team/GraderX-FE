import React from "react";
import fileDownload from "js-file-download";
import apiClient from "../../api-client";
import { Download32 } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';

function DownloadResult(props) {
  function downloadFile() {
    apiClient.downloadResults(props.course, props.lab).then(res => {
      fileDownload(res.data, "results.zip");
    });
  }

  return (
    <React.Fragment>     
      <Button kind="primary" renderIcon={Download32}
        onClick={downloadFile}>
        DOWNLOAD
        </Button>
    </React.Fragment>
  );
}

export default DownloadResult;
