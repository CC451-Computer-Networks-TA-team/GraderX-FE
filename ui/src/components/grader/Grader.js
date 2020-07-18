import React, { useState } from "react";
import LabSelector from "./LabSelector";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FileUpload from "./FileUpload";
import DownloadResult from "./DownloadResult";

function Grader() {
  const [lab, setLab] = useState("");
  const [resultsReady, setResultsReady] = useState(false);

  function changeLab(val) {
    setLab(val);
    setResultsReady(false);
  }

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={5}>
        <Paper elevation={5} style={{ padding: 25 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LabSelector setLab={changeLab} />
            </Grid>
            {lab ? (
              <Grid item xs={12}>
                <FileUpload lab={lab} resultsReady={setResultsReady} />
                {resultsReady ? <DownloadResult lab={lab} /> : null}
              </Grid>
            ) : null}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Grader;
