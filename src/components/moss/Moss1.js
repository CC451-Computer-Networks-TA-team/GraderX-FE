import React, { useState, useEffect } from "react";
import { Button } from "carbon-components-react";
import { Upload16 } from "@carbon/icons-react";
import "../styles.scss";
import apiClient from "../../api-client";
import MossFileUpload from "./MossFileUpload";
import Status, { statusState } from "../grader/Status";
import MossLinkView from "./MossLinkView";
import CourseSelector from "../grader/CourseSelector"
import LabSelector from "../grader/LabSelector"
import AppHeader from "../layout/AppHeader";

function MossOne() {
  const [course, setCourse] = useState("")
  const [lab, setLab] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [mossLink, setMossLink] = useState("");
  const [clearSubs, setClearSubs] = useState(false);
  const [useExisting, setUseExisting] = useState(false)

  const resetFile = () => {
    setFile(null);
    setStatus("");
  };

  const changeFile = (file) => {
    setStatus(statusState.LOADING);
    setFile(file);
  };

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("submissions_file", file);
      runMoss(formData)
    }
  }, [file]);

  const runOnExisting = () => {
    setUseExisting(true)
    setStatus(statusState.LOADING);
    runMoss(null, true)
    
  };

  const runMoss = (formData = null, useExisting = false) => {
    apiClient
      .uploadMossSubmissions(course, lab, clearSubs, useExisting, formData)
      .then((res) => {
        setMossLink(res.data.url);
        setStatus("");
      })
      .catch((err) => {
        setStatus(statusState.FAILED);
      });
  };

  const determineVisible = () => {
    if (!course) {
      return <CourseSelector setCourse={setCourse} />
    } else if (!lab) {
      return <LabSelector setLab={setLab} course={course} />;
    } else if (!file && !useExisting) {
      return (
        <MossFileUpload
          setFile={changeFile}
          clearSubs={clearSubs}
          setClearSubs={setClearSubs}
          runOnExisting={runOnExisting}
        />
      );
    } else if (status) {
      return (
        <Status
          statusState={status}
          loadingText="processing"
          reset={resetFile}
        />
      );
    } else {
      return <MossLinkView link={mossLink} />;
    }
  };

  return (
    <div>
      <AppHeader />
      {determineVisible()}
    </div>
  );
}

export default MossOne;
