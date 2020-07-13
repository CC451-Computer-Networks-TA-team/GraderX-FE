import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  return (
    <div>
        <AppBar >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Album layout
            </Typography>
          </Toolbar>
        </AppBar>
        <Button style={{'marginTop': 100}} variant="contained" color="primary">Evaluate</Button>

    </div>
  );
}

export default App;
