import React, { useState } from "react";
import { Button } from "carbon-components-react";
import { Upload16 } from "@carbon/icons-react";
import "../styles.scss";
import { validateExtension } from "../../utils";
import apiClient from "../../api-client";

import AppHeader from "../layout/AppHeader";

function MossFileUpload(props) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [importing, setImporting] = useState(false);
  const [selectedInvalid, setSelectedInvalid] = useState(false);
  const fileInputRef = React.createRef();

  function onFileChange(event) {
    if (
      event.target.files[0] &&
      validateExtension(event.target.files[0].type)
    ) {
        props.setFile(event.target.files[0])
    //   const formData = new FormData();
    //   formData.append("submissions_file", event.target.files[0]);
    //   apiClient.uploadMossSubmissions("cc451", "lab3", formData).then((res) => {
    //     console.log(res);
    //   });
    } else {
      setSelectedInvalid(true);
    }
  }

  return (
    <div>
      <div>
        <AppHeader />
      </div>

      <div className="moss-container">
        <h3>MOSS</h3>
        <div style={{ height: 24 }}></div>
        <p> Only .rar / .7z / .zip files</p>
        <div style={{ height: 16 }}></div>
        <Button
          renderIcon={Upload16}
          onClick={() => fileInputRef.current.click()}
        >
          Select file
        </Button>
        {selectedInvalid ? (
          <div>
            <div style={{ height: 16 }}></div>
            <p>Supported files: .rar / .7z / .zip</p>
          </div>
        ) : null}
        {/* a hidden input is created because semantic ui does not have a file upload component by default
            a normal button is created that triggers a hidden file input when the button is clicked */}
        <input
          ref={fileInputRef}
          name="submissions_file"
          type="file"
          hidden
          onChange={onFileChange}
          accept=".zip,.rar,.7zip,.tar"
        />
      </div>
    </div>
  );
}

export default MossFileUpload;
