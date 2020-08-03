import React, { useState, useEffect } from "react";
import { Loader, Header, Icon } from "semantic-ui-react";
import apiClient from "../../api-client";

const QUERY_INTERVAL = 100;

function Status(props) {

  const [currentStatus, setCurrentStatus] = useState("")

  useEffect(() => {
    const intervalId = setInterval(() => {  //assign interval to a variaable to clear it
      apiClient.getStatus().then(res => {
        setCurrentStatus(res.data);
        console.log(currentStatus);
      })
    }, QUERY_INTERVAL)
  
    return () => clearInterval(intervalId); //This is important
  
  }, );

  return (
    <React.Fragment>
      <div style={{ minHeight: "8em", textAlign: "center" }}>
        {props.status.toLowerCase() === "grading" ? (
          <Loader
          size="large"
          content={
            currentStatus
          }
          active
        />
        ) : (
          <React.Fragment>
            <Header as="h2" icon textAlign="center">
              <Icon name="x" color="red" />
              Grading Failed
              <Header.Subheader>
                Please make sure the compressed file is not broken.
              </Header.Subheader>
            </Header>
            <Header as="h5" textAlign="center">
              <a
                href={() => false}
                style={{ cursor: "pointer" }}
                onClick={props.resetFile}
              >
                <Icon name="chevron left" style={{ marginRight: ".4em" }} />
                Select another file
              </a>
            </Header>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default Status;
