import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Header, Container } from "semantic-ui-react";
import { Link } from 'react-router-dom'


function AppHeader() {
  const [activeItem, setActiveItem] = useState("grader")
  const graderLink = React.createRef();
  const mossLink = React.createRef();

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }
  return (
    <React.Fragment>
      <Menu fixed="top" borderless inverted>
        <Container>
          <Menu.Item>
            <Header as="h3" inverted>
              GraderX
            </Header>
          </Menu.Item>
          <Menu.Item
            name="grader"
            active={activeItem === "grader"}
            onClick={handleItemClick}
            style={{padding: "0"}}>
            <Link to="/grader" innerRef={graderLink} style={{height: "100%", padding: "1rem"}}>Grader</Link>
          </Menu.Item>
          <Menu.Item
            name="moss"
            active={activeItem === "moss"}
            onClick={handleItemClick}
            style={{padding: "0"}}
            link>
            <Link to="/moss" innerRef={mossLink} style={{height: "100%", padding: "1rem"}}>MOSS</Link>
          </Menu.Item>
        </Container>
      </Menu>
    </React.Fragment>
  );
}

export default AppHeader;
