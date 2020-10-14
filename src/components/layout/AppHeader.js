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
          <HeaderMenuItem href="/courses">Courses</HeaderMenuItem>
          <HeaderMenuItem href="/labs">Labs</HeaderMenuItem>
          <HeaderMenuItem href="/grader">Grader</HeaderMenuItem>
          <HeaderMenuItem href="#">Moss</HeaderMenuItem>
        </HeaderNavigation>
      </Header>
    </React.Fragment>
  );
}

export default AppHeader;
