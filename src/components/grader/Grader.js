import React, { useState, useEffect } from "react";
import { Segment, Grid, Container } from "semantic-ui-react";
import LabSelector from "./LabSelector";
import GetSubmissions from './submissions/GetSubmissions'
import Status from "./Status";
import DownloadResult from "./DownloadResult";
import apiClient from "../../api-client";


function Grader() {
  const [lab, setLab] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [importing, setImporting] = useState(false)

  function changeLab(val) {
    setLab(val);
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
      .uploadSubmissions(lab, formData)
      .then(res => {
        setStatus("");
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
    apiClient.startImporting(accessToken, sheetLink, field, lab)
      .then((res) => {
        apiClient.startGrading(lab)
          .then(res => {
            setStatus("")
          })
      })
  }

  const determineVisible = () => {
    if (!lab) {
      return <LabSelector setLab={changeLab} />;
    } else if (!importing && !file) {
      return <GetSubmissions setFile={changeFile} resetLab={resetLab} importAndGrade={importAndGrade} />;
    } else if (status) {
      return <Status status={status} resetFile={resetFile} />;
    } else {
      return <DownloadResult lab={lab} resetLab={resetLab} />;
    }
  };

  return (
    <Container style={{ marginTop: "7em" }}>
      <Grid centered>
        <Grid.Column width={8}>
          <Segment raised padded>
            {determineVisible()}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Grader;
