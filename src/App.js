import React from "react";

import { Route, Switch, Redirect } from 'react-router-dom';
import Grader from "./components/grader/Grader";
import LabsPage from './pages/lab/Labs';
import CoursesPage from "./pages/Courses";
import MarkdownPage from "./pages/markdown/Markdown";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/courses/:course/labs/:lab/lab_guide" component={MarkdownPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/labs" component={LabsPage} />
        <Route path="/grader" component={Grader} />
        <Redirect from="/" to="/grader" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
