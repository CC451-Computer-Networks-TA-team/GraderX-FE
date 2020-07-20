import React, { useState } from "react";
import { Button, Label, Header, Icon } from "semantic-ui-react";

export function validateExtension(extension) {
  const supportedTypes = [
    "application/zip",
    "application/vnd.rar",
    "application/x-7z-compressed"
  ];
  return supportedTypes.includes(extension);
}

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
      <Header as="h4">
        Select a compressed file containing the submissions
      </Header>
      <Button
        content="Choose File"
        labelPosition="right"
        fluid
        basic
        size={"large"}
        icon="upload"
        onClick={() => fileInputRef.current.click()}
      />
      {selectedInvalid ? (
        <Label pointing size={"medium"} basic color="red">
          Supported types: rar, 7z, zip
        </Label>
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

export default FileUpload;
