import React, { useState } from "react";
import StudentView from "./components/StudentView";
import TeacherView from "./components/TeacherView";
import './App.css';


function App() {
  const [isStudent, setIsStudent] = useState (true);

  const handleChangeView = (isStudent) => {
    setIsStudent(isStudent);
  };


  return (
    <div className="App">
      <nav>
      <button className={isStudent? "student": null} onClick={(e) => handleChangeView(true)}>STUDENT</button>
      <button className={!isStudent? "teacher": null} onClick={(e) => handleChangeView(false)}>TEACHER</button>
    </nav>
    {
      isStudent?
    <StudentView/>
    :<TeacherView/>
    }
    
    </div>
  );
}

export default App;
