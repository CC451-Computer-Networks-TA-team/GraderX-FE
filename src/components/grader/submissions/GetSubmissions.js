import React from "react";
import { Header, Icon, Divider } from "semantic-ui-react";
import ImportSubmissions from './ImportSubmissions'
import FileUpload from "./FileUpload";

const GetSubmissions = (props) => {
  return (
    <React.Fragment>
      <FileUpload setFile={props.setFile} resetLab={props.resetLab} />
      <Divider horizontal>Or</Divider>
      <ImportSubmissions importAndGrade={props.importAndGrade} />
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


    </React.Fragment>
  )
}

export default GetSubmissions
