import React, { useState, useEffect } from "react";
import { Segment, Grid, Container } from "semantic-ui-react";
import LabSelector from "./LabSelector";
import CourseSelector from './CourseSelector'
import GetSubmissions from './submissions/GetSubmissions'
import Status from "./Status";
import GradingService from '../../services/GradingService'
import ResultsContainer from "./ResultsContainer"

function Grader() {
  const [course, setCourse] = useState("")
  const [lab, setLab] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [importing, setImporting] = useState(false);
  const [diff, setDiff] = useState(null);

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

    GradingService
      .uploadSubmissions(course, lab, formData)
      .then(response => {
        console.log(response)
        GradingService
          .startGrading(course, lab)
          .then(response => {
            setStatus("");
          })

      })

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

    GradingService
      .startImporting(accessToken, sheetLink, field, course, lab)
      .then((response) => {
        GradingService.startGrading(course, lab)
          .then(res => {
            setStatus("")
          })
      });





  }

  const getDiffResults = () => {

    const selected_course = "test_course"
    if (course === selected_course) {

      GradingService
        .getDiffResults(course, lab)
        .then((response) => {
          setDiff(response)
        });

    }
  }

  const determineVisible = () => {
    if (!course) {
      //return <DiffContainer/>
      return <CourseSelector setCourse={changeCourse} />
    } else if (!lab) {
      return <LabSelector setLab={changeLab} course={course} />;
    } else if (!importing && !file) {
      return <GetSubmissions setFile={changeFile} resetLab={resetLab} importAndGrade={importAndGrade} />;
    } else if (status) {
      return <Status status={status} resetFile={resetFile} />;
    } else {
      return (<div>
        <ResultsContainer course={course} lab={lab} diff={diff} resetLab={resetLab} getDiffResults={getDiffResults} />
      </div>
      )

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
