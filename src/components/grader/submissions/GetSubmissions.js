import React from "react";
import ImportSubmissions from './ImportSubmissions'
import FileUpload from "./FileUpload";
import '../../styles.scss';

import { Link } from 'carbon-components-react';

const GetSubmissions = (props) => {
  return (
    <React.Fragment>
      <div className="moss-container">
        <div style={{ paddingTop: 50 }}>
          <h3>Import Submissions</h3>
          <div style={{ height: 24 }}></div>
          <FileUpload setFile={props.setFile} resetLab={props.resetLab} />
          <div style={{ height: 24 }}></div>
          <div class="separator">
            <div class="left"></div>
            <div class="sep-word"><b>OR</b></div>
            <div class="right"></div>
          </div>
          <div style={{ height: 16 }}></div>
          <ImportSubmissions importAndGrade={props.importAndGrade} />
          <div style={{ height: 16 }}></div>
          <Link href="#" onClick={props.resetLab}>Select another lab</Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default GetSubmissions
