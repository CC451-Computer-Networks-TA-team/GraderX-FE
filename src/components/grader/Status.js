import React from "react";
import { Loader, Header, Icon } from "semantic-ui-react";

function Status(props) {
  return (
    <React.Fragment>
      <div style={{ minHeight: "8em", textAlign: "center" }}>
        {props.status.toLowerCase() === "grading" ? (
          <Loader
            size="large"
            content={
              props.status.charAt(0).toUpperCase() +
              props.status.slice(1).toLowerCase() +
              "..."
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
