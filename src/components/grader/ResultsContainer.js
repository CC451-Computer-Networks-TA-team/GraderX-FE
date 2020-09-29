import React, { useEffect, useState } from "react";
import DownloadResult from "./DownloadResult";
import Revision from "./submissions/Revision"
import { Header, Icon } from "semantic-ui-react";
import apiClient from "../../api-client";


function ResultsContainer(props) {
  // eslint-disable-next-line
  const [fileNameList, setFileNameList] = useState();

  useEffect(() => {
    apiClient.getSubmissionFilesList(props.course, props.lab)
      .then(res => {
        console.log(res)
        setFileNameList(res.data)
      })
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <Header textAlign="center" as="h4" style={{ color: "Black" }}>
        Here are the Results !
        </Header>

      <Revision
        course={props.course}
        lab={props.lab}
      />
      <DownloadResult course={props.course} lab={props.lab} resetLab={props.resetLab} />
      <Header as="h5" textAlign="center">
        <a
          href={() => false}
          style={{ cursor: "pointer" }}
          onClick={props.resetLab}
        >
          <Icon name="chevron left" style={{ marginRight: ".4em" }} />
          Select another lab
        </a>
      </Header>
    </React.Fragment>
  );
}

export default ResultsContainer;
