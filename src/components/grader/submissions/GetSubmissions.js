import React from "react";
import { Header, Icon, Divider, Grid, Input } from "semantic-ui-react";
import ImportSubmissions from './ImportSubmissions'
import FileUpload from "./FileUpload";
import MossLinkInput from '../../moss/MossLinkInput'

const GetSubmissions = (props) => {
  return (
    <React.Fragment>
      <FileUpload setFile={props.setFile} resetLab={props.resetLab} />
      <Divider horizontal>Or</Divider>
      {
        !props.moss ? (
          <React.Fragment>
            <ImportSubmissions importAndGrade={props.importAndGrade} />
            <Grid>
              <Grid.Column>
                <Header as="h5">
                  <a
                    href={() => false}
                    style={{ cursor: "pointer" }}
                    onClick={props.resetLab}
                  >
                    <Icon name="chevron left" style={{ marginRight: ".4em" }} />
                    Select another lab
                  </a>
                </Header>
              </Grid.Column>
            </Grid>
          </React.Fragment>
        ):
        (
          <MossLinkInput useExisting={props.useExisting} />
        ) 
      }
      
      
      
    </React.Fragment>
  )
}

export default GetSubmissions
