import React from "react";
import AppHeader from "./components/layout/AppHeader";
import { Route, Switch } from 'react-router-dom';
import Grader from "./components/grader/Grader";
import LabsPage from './pages/Labs'
import CoursesPage from "./pages/Courses";

function App() {
  return (
    <React.Fragment>
      <AppHeader />
      <Switch>
        <Route path="/courses" component={CoursesPage}/>
        <Route path="/labs" component={LabsPage} />
        <Route path="/grader" component={Grader}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
