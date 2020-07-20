import React, { useState, useEffect } from "react";
import { Segment, Grid, Container } from "semantic-ui-react";
import LabSelector from "./LabSelector";
import FileUpload from "./FileUpload";
import Status from "./Status";
import DownloadResult from "./DownloadResult";
import apiClient from "../../api-client";

// import DownloadResult from "./DownloadResult";

function Grader() {
  const [lab, setLab] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

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
    setStatus("");
  };

  const resetFile = () => {
    setFile(null);
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

  const determineVisible = () => {
    if (!lab) {
      return <LabSelector setLab={changeLab} />;
    } else if (!file) {
      return <FileUpload setFile={changeFile} resetLab={resetLab} />;
    } else if (status) {
      return <Status status={status} resetFile={resetFile} />;
    } else {
      return <DownloadResult lab={lab} resetLab={resetLab} />;
    }
  };

  return (
    <Container style={{ marginTop: "7em" }}>
      <Grid centered>
        <Grid.Column width={7}>
          <Segment raised padded>
            {determineVisible()}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Grader;
