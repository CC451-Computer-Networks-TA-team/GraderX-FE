import React from "react";
import {NavLink} from 'react-router-dom'

import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
} from "carbon-components-react/lib/components/UIShell";

function AppHeader() {
  const links = [
    { key: 0, to: "/courses", text: "Courses" },
    { key: 1, to: "/labs", text: "Labs" },
    { key: 2, to: "/grader", text: "Grader" },
  ];

  return (
    <React.Fragment>
      <Header aria-label="Alexandria University - GraderX">
        <HeaderName href="#" prefix="Alexandria University">
          Grader-X
        </HeaderName>
        <HeaderNavigation aria-label="Alexandria University - GraderX">
          {links.map((link) => (
            <NavLink key={link.key} className="bx--header__menu-item" to={link.to}>{link.text}</NavLink>
          ))}          
        </HeaderNavigation>
      </Header>
    </React.Fragment>
  );
}

export default AppHeader;
