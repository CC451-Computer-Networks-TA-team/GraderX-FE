import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/layout/Header'
import Grader from './components/grader/Grader'



function App() {

  return (
    <React.Fragment>
      <CssBaseline/>
        <Header/>
        <Container>
          <main style={{'marginTop': 100}}>
              <Grader/>
          </main>
        </Container>
    </React.Fragment>
  );
}

export default App;
