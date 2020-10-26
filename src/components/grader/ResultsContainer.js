import React, { useEffect, useState } from "react";
import DownloadResult from "./DownloadResult";
import Revision from "./submissions/Revision"
import apiClient from "../../api-client";
import { Tile, Link } from 'carbon-components-react';

function ResultsContainer(props) {
  // eslint-disable-next-line
  const [fileNameList, setFileNameList] = useState();

  useEffect(() => {
    apiClient.getSubmissionFilesList(props.course, props.lab)
      .then(res => {
        setFileNameList(res.data)
      })
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>

      <div
        className="bx--grid"
        style={{
          width: "50%",
          paddingTop: "20%",
          margin: "auto"
        }}
      >

        <div style={{ paddingBottom: "0.5rem" }}>

          <Tile style={{ color: "White" }}>
            <h4> Grading Results</h4>
          </Tile>

          <Revision
            course={props.course}
            lab={props.lab}
            submissionKey={props.submissionKey}
          />
          
          <DownloadResult course={props.course} lab={props.lab} resetLab={props.resetLab} submissionKey={props.submissionKey} />
        </div>

        <Link href="#"
          onClick={props.resetLab}> {"< "}Select another lab</Link>

      </div>

    </React.Fragment>
  );
}

export default ResultsContainer;
