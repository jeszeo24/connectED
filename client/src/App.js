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
    <h1>connectED</h1>
      <nav className="user">
      <button className={isStudent? "active" : null} onClick={(e) => handleChangeView(true)}>STUDENT</button>
      <button className={!isStudent? "active" : null} onClick={(e) => handleChangeView(false)}>TEACHER</button>
    </nav> 
    
    <div className="main"> 
    <div className="main2">

    {
      isStudent?
    <StudentView/>
    :<TeacherView/>
    }
    </div>
    </div>
    </div>
  );
}

export default App;
