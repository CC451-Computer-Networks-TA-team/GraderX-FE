import React, { useState } from "react";
import apiClient from "../../api-client";
import CircularProgress from "@material-ui/core/CircularProgress";


function FileUpload(props) {
  const [selectedFile, selectFile] = useState(null);
  const [loading , setLoading]=useState(false);
  function onFileChange(event) {
    setLoading(false);
    selectFile(event.target.files[0]);
  }
  function onFileClick(){
    setLoading(true);
  }

  function onFileUpload() {

    const formData = new FormData();
    formData.append("submissions_file", selectedFile);
    apiClient.uploadSubmissions(props.lab, formData).then(res => {
      props.resultsReady(true);
    });

     
    
  }


  function validateExtention(){

    let extension = selectedFile.type
    let supportedTypes = ["application/zip", "application/vnd.rar", "application/x-7z-compressed" ];
    if (!supportedTypes.includes(extension)) {
      alert("Invalid/Unsupported Extension!")
      
    }else{

      onFileUpload();
    }

  }
  function fileData() {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
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
        <input type="file" onClick={onFileClick} onChange={onFileChange} />

        

        {selectedFile ? (
          <button onClick={validateExtention}>Upload and Grade</button>
        ) : null}
        <br></br>
        {loading? <CircularProgress /> : null}
      </div>
      {fileData()}
    </div>
  );
}

export default FileUpload;
