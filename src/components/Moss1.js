import React from 'react';
import './styles.scss';

import AppHeader from "./layout/AppHeader";

import {
  FileUploader, TextInput,
} from 'carbon-components-react';

function MossOne() {

  return (
    <div>
      <div>
        <AppHeader />
      </div>
      <div className="moss-container">
        <div style={{ paddingTop: 50 }}>
          <h1>Moss</h1>
          <div style={{ height: 32 }}></div>
          <FileUploader
            accept={[
              '.zip',
              '.rar'
            ]}
            buttonKind="primary"
            buttonLabel="Add files"
            filenameStatus="edit"
            iconDescription="Clear file"
            labelDescription="only .zip or .rar files at 500mb or less"
            labelTitle="Upload"
          />
          <div style={{ height: 8 }}></div>
          <div class="separator">
            <div class="left"></div>
            <div class="sep-word"><b>OR</b></div>
            <div class="right"></div>
          </div>
          <div style={{ height: 8 }}></div>
          <TextInput
            id="courseName"
            labelText="Enter Moss Link"
            placeholder="URL"
          />
        </div>
      </div>
    </div>

  );
}

export default MossOne;
