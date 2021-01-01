import React, { useState, useEffect } from "react";
import { Button } from "carbon-components-react";
import { Upload16 } from "@carbon/icons-react";
import "../styles.scss";
import apiClient from "../../api-client";
import MossFileUpload from "./MossFileUpload";
import Status from "../grader/Status";

function MossOne() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const resetFile = () => {
    setFile(null);
    setStatus("");
  };

  useEffect(
    () => {
      if (file) {
        const formData = new FormData();
        formData.append("submissions_file", file);
        apiClient
          .uploadMossSubmissions("cc451", "lab3", formData)
          .then((res) => {
            setStatus("grading")
          });
      }
    },
    [file]
  );

  const determineVisible = () => {
    if (!file) {
      return <MossFileUpload setFile={setFile} />;
    } else if (status) {
      return <Status status="grading" resetFile={resetFile} />;
    } else {
      return <h1>Done</h1>;
    }
  };

  return determineVisible();
}

export default MossOne;
