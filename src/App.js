import React from "react";
import AppHeader from "./components/layout/AppHeader";
import Grader from "./components/grader/Grader";
import CoursesPage from "./pages/Courses";

function App() {
  return (
    <React.Fragment>
      <AppHeader />
      <CoursesPage />
    </React.Fragment>
  );
}

export default App;
