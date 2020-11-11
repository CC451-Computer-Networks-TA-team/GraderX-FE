import React, { useState, useEffect } from "react";
import LabSelector from "./LabSelector";
import CourseSelector from './CourseSelector'
import GetSubmissions from './submissions/GetSubmissions'
import Status from "./Status";
import apiClient from "../../api-client";
import ResultsContainer from "./ResultsContainer"
import AppHeader from "../../components/layout/AppHeader";
function Grader() {
  const [course, setCourse] = useState("")
  const [lab, setLab] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [importing, setImporting] = useState(false);

  function changeLab(val) {
    setLab(val);
  }

  function changeCourse(val) {
    setCourse(val);
  }

  const changeFile = f => {
    setStatus("grading");
    setFile(f);
  };

  const resetLab = () => {
    setLab("");
    setFile(null);
    setImporting(false)
    setStatus("");
  };

  const resetFile = () => {
    setFile(null);
    setImporting(false)
    setStatus("");
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("submissions_file", file);
    apiClient
      .uploadSubmissions(course, lab, formData)
      .then(res => {
        apiClient.startGrading(course, lab)
          .then(res => {
            setStatus("");
          }).catch(err => {
            setStatus("failed");
          })

      })
      .catch(err => {
        setStatus("failed");
      });
  };


  useEffect(() => {
    if (file) {
      uploadFile();
    }
    // eslint-disable-next-line
  }, [file]);

  const importAndGrade = (accessToken, sheetLink, field) => {
    setStatus("grading")
    setImporting("true")
    apiClient.startImporting(accessToken, sheetLink, field, course, lab)
      .then((res) => {
        apiClient.startGrading(course, lab)
          .then(res => {
            setStatus("")
          }).catch(err => {
            setStatus("failed");
          })

      })





  }

  const determineVisible = () => {
    if (!course) {
      return <CourseSelector setCourse={changeCourse} />
    } else if (!lab) {
      return <LabSelector setLab={changeLab} course={course} />;
    } else if (!importing && !file) {
      return <GetSubmissions setFile={changeFile} resetLab={resetLab} importAndGrade={importAndGrade} />;
    } else if (status) {
      return <Status status={status} resetFile={resetFile} />;
    } else {
      return (<div>
        <ResultsContainer course={course} lab={lab} resetLab={resetLab} />
      </div>
      )

    }
  };

  return (
    <div>
      <AppHeader />
      {determineVisible()}
    </div>
  );
}

export default Grader;
