import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import apiClient from "../../api-client";

import './Markdown.scss';

import { Button } from 'carbon-components-react';
import { Add16 } from '@carbon/icons-react';

export function validateExtension(extension) {
  const supportedTypes = [
    "application/zip",
    "application/vnd.rar",
    "application/x-7z-compressed",
    "application/x-zip-compressed",
  ];
  return supportedTypes.includes(extension);
}


function MarkdownPage({ match }) {
  const courseName = match.params.course;
  const LabName = match.params.lab;

  const fileInputRef = React.createRef();
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    apiClient.getLabMD(courseName, LabName).then(res => {
      setMarkdown(res.data.lab_guide);
    });
  });

  const uploadFile = (file) => {
    const formData = new FormData();

    formData.append("submissions_file", file);

    apiClient
      .uploadSubmissions(courseName, LabName, formData)
      .then(_res => {
        apiClient.startGrading(courseName, LabName)
          .then(_res => {
            apiClient.getDiffResults(courseName, LabName).then(res => {
              console.log(res.data);
            });
          })
      });
  };

  function onFileChange(event) {
    if (
      event.target.files[0] &&
      validateExtension(event.target.files[0].type)
    ) {
      uploadFile(event.target.files[0]);
    }
  }

  return (
    <div className="content">
      <div style={{ height: 24 }}></div>
      <ReactMarkdown plugins={[gfm]}>
        {markdown}
      </ReactMarkdown>
      <div style={{ height: 32 }}></div>
      <Button renderIcon={Add16} onClick={() => fileInputRef.current.click()}>
        Submit your code
      </Button>
      <input
        ref={fileInputRef}
        name="submissions_file"
        type="file"
        hidden
        onChange={onFileChange}
        accept=".zip,.rar,.7zip,.tar,.7z"
      />
      <div style={{ height: 32 }}></div>
      <h3>Results</h3>

    </div>
  );
}

export default MarkdownPage;
