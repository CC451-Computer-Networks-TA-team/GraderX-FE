import React from "react";
import AppHeader from "./components/layout/AppHeader";
import { Route, Switch, Redirect } from 'react-router-dom';
import Grader from "./components/grader/Grader";
import LabsPage from './pages/lab/Labs'
import CoursesPage from "./pages/Courses";

function App() {
  return (
    <React.Fragment>
      <AppHeader />
      <Switch>
        <Route path="/courses" component={CoursesPage}/>
        <Route path="/labs" component={LabsPage} />
        <Route path="/grader" component={Grader}/>
        <Redirect from="/" to="/grader"/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
