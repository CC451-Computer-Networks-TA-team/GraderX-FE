import React from "react";
import { Header, Divider } from "semantic-ui-react";
import ImportSubmissions from './ImportSubmissions'
import FileUpload from "./FileUpload";
import { Button} from 'carbon-components-react';
import {PreviousOutline32 } from '@carbon/icons-react';

const GetSubmissions = (props) => {
  return (
    <React.Fragment>
      <FileUpload setFile={props.setFile} resetLab={props.resetLab} />
      <Divider horizontal>Or</Divider>
      <ImportSubmissions importAndGrade={props.importAndGrade} />
      <Header as="h5">
      <Button kind="ghost" renderIcon={PreviousOutline32}
          onClick={props.resetLab}>
          Select another lab
        </Button>

      </Header>


    </React.Fragment>
  )
}

export default GetSubmissions
