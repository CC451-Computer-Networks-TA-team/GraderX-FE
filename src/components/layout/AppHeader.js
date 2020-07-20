import React from "react";
import { Menu } from "semantic-ui-react";
import { Header, Container } from "semantic-ui-react";

function AppHeader() {
  return (
    <React.Fragment>
      <Menu fixed="top" borderless inverted>
        <Container>
          <Menu.Item>
            <Header as="h3" inverted>
              GraderX
            </Header>
          </Menu.Item>
        </Container>
      </Menu>
    </React.Fragment>
  );
}

export default AppHeader;
