import React from "react";

import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem
} from "carbon-components-react/lib/components/UIShell";

function AppHeader() {
  return (
    <React.Fragment>
      <Header aria-label="Alexandria University - GraderX">
        <HeaderName href="#" prefix="Alexandria University">Grader-X</HeaderName>
        <HeaderNavigation aria-label="Alexandria University - GraderX">
          <HeaderMenuItem href="#">Courses</HeaderMenuItem>
          <HeaderMenuItem href="#">Labs</HeaderMenuItem>
          <HeaderMenuItem href="#">Grader</HeaderMenuItem>
          <HeaderMenuItem href="#">Moss</HeaderMenuItem>
        </HeaderNavigation>
      </Header>
    </React.Fragment>
  );
}

export default AppHeader;
