import React, { useState } from "react";
import apiClient from "../../api-client";

function FileUpload(props) {
  const [selectedFile, selectFile] = useState(null);

  function onFileChange(event) {
    selectFile(event.target.files[0]);
  }

  function onFileUpload() {
    const formData = new FormData();
    formData.append("submissions_file", selectedFile);
    apiClient.uploadSubmissions(props.lab, formData).then(res => {
      props.resultsReady(true);
    });
  }

  function fileData() {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  }

  return (
    <div>
      <h3>Upload a .rar file containing the lab submissions.</h3>
      <div>
        <input type="file" onChange={onFileChange} />
        {selectedFile ? (
          <button onClick={onFileUpload}>Upload and Grade</button>
        ) : null}
      </div>
      {fileData()}
    </div>
  );
}

export default FileUpload;
