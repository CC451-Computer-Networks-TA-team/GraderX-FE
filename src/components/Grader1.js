import React from 'react';
import './styles.scss';

import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem
} from "carbon-components-react/lib/components/UIShell";

import {
  FileUploader, TextInput, Dropdown
} from 'carbon-components-react';

function GraderOne() {

  return (
    <div>
      <div>
        <Header aria-label="Alexandria University - GraderX">
          <HeaderName href="#" prefix="Alexandria University">
            Grader-X
        </HeaderName>
          <HeaderNavigation aria-label="Alexandria University - GraderX">
            <HeaderMenuItem href="#">Courses</HeaderMenuItem>
            <HeaderMenuItem href="#">Labs</HeaderMenuItem>
            <HeaderMenuItem href="#">Grader</HeaderMenuItem>
            <HeaderMenuItem href="#">Moss</HeaderMenuItem>
          </HeaderNavigation>
        </Header>
      </div>
      <div className="moss-container">
        <div style={{ paddingTop: 50 }}>
          <h1>Grader</h1>
          <div style={{ height: 32 }}></div>
          <Dropdown
            id="default"
            titleText="Select Course"
            label="Select"
            items={['Option 1', 'Option 2', 'Option 3']}
          />
          <div style={{ height: 32 }}></div>

          <Dropdown
            id="default"
            titleText="Select Lab"
            label="Select"
            items={['Option 1', 'Option 2', 'Option 3']}
          />
        </div>
      </div>
    </div>

  );
}

export default GraderOne;
