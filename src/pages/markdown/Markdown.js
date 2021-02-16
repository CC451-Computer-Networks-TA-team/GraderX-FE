import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import apiClient from "../../api-client";
import ReactDiffViewer from "react-diff-viewer";
import DownloadResult from "../../components/grader/DownloadResult";

import "./Markdown.scss";

import { Button } from "carbon-components-react";
import { Add16 } from "@carbon/icons-react";

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
  const [resultsReady, setResultsReady] = useState(false);
  const [diff, setDiff] = useState([]);
  const [totalTestcases, setTotalTestcases] = useState(0);
  const resultsContainerRef = useRef(null);

  useEffect(() => {
    apiClient.getLabMD(courseName, LabName).then((res) => {
      setMarkdown(res.data.lab_guide);
    });
  });

  useEffect(() => {
    if (resultsContainerRef.current && resultsReady) {
      resultsContainerRef.current.scrollIntoView();
    }
  }, [resultsReady]);

  const uploadFile = (file) => {
    setResultsReady(false);
    const formData = new FormData();

    formData.append("submissions_file", file);

    apiClient.uploadSubmissions(courseName, LabName, formData).then((_res) => {
      apiClient
        .startGrading(courseName, LabName, true)
        .then((_res) => {
          apiClient.getDiffResults(courseName, LabName).then((res) => {
            setDiff(res.data.diff[0].failed);
            setTotalTestcases(res.data.total_test_cases_count);
          });
        })
        .finally((res) => {
          setResultsReady(true);
        });
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
    <div className="content single-submission">
      <div style={{ height: 24 }}></div>
      <div className="markdown-container">
        <ReactMarkdown plugins={[gfm]}>{markdown}</ReactMarkdown>
      </div>
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
      {resultsReady && (
        <div ref={resultsContainerRef} className="results-container">
          <h3 className="results-header">Results</h3>
          {diff.length > 0 && (
            <div>
              <p
                className={`results-summary ${
                  diff.length == 0 ? "success" : "warning"
                }`}
              >
                You passed {totalTestcases - diff.length} test case
                {totalTestcases - diff.length == 1 ? "" : "s"} out of{" "}
                {totalTestcases}
              </p>
              {diff.map((tc) => (
              <div key={tc.tc_id}>
                <h4>Test Case {tc.tc_id}</h4>
                <hr></hr>
                <ReactDiffViewer
                  leftTitle="Expected"
                  rightTitle="Output"
                  oldValue={tc.expected}
                  newValue={tc.output}
                  useDarkTheme={true}
                  className="single-diff-container"
                />
                <br></br>
              </div>
              ))}
            </div>
          )}
          <div>
            <DownloadResult course={courseName} lab={LabName}></DownloadResult>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarkdownPage;
