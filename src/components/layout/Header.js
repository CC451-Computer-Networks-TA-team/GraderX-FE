import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AppBar } from "@material-ui/core";

function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          GraderX
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
