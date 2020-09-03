import React from "react";
import AppHeader from "./components/layout/AppHeader";
import Grader from "./components/Grader";
import Moss from './components/Moss'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <React.Fragment>
        <AppHeader />
        <Route path="/grader">
          <Grader />
        </Route>
        <Route path="/moss">
          <Moss />
        </Route>
        <Route exact path="/">
          <Redirect to="/grader" />
        </Route>
      </React.Fragment>
    </Router>
  );
}

export default App;
