import React from "react";
import fileDownload from "js-file-download";
import apiClient from "../../api-client";

function DownloadResult(props) {
  function downloadFile() {
    apiClient.downloadResults(props.lab).then((res) => {
      let resFile = new File([res.data], "results.txt", {
        type: "text/plain",
      });
      fileDownload(resFile, "results.txt");
    });
  }

  return (
    <React.Fragment>
      <hr></hr>
      <p>Results are ready for download</p>
      <button onClick={downloadFile}>DOWNLOAD</button>
    </React.Fragment>
  );
}

export default DownloadResult;
