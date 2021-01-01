import React, { useState } from "react";
import { Button } from 'carbon-components-react';
import { Upload16 } from '@carbon/icons-react';
import {validateExtension} from '../../../utils'



function FileUpload(props) {
  const [selectedInvalid, setSelectedInvalid] = useState(false);
  const fileInputRef = React.createRef();

  function onFileChange(event) {
    if (
      event.target.files[0] &&
      validateExtension(event.target.files[0].type)
    ) {
      props.setFile(event.target.files[0]);
    } else {
      setSelectedInvalid(true);
    }
  }


  return (
    <React.Fragment>
      <p> Only .rar / .7z / .zip files. 500mb max file size </p>
      <div style={{ height: 16 }}></div>
      <Button renderIcon={Upload16} onClick={() => fileInputRef.current.click()}>Select file</Button>
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
    </React.Fragment>
  );
}

export default FileUpload;
