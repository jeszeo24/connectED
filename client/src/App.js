import React, { useState } from "react";
import StudentView from "./components/StudentView";
import TeacherView from "./components/TeacherView";
import Chat from "./components/Chat";
import './App.css';


function App() {
  const [isStudent, setIsStudent] = useState (true);
  const [senderId, setSenderId] = useState(1);
  const [receiverId, setReceiverId] = useState(2);
  
    function handleChange(event) {
      let { name, value } = event.target;
      if (name === "senderId") {
        setSenderId( Number(value) );
      } else {
        setReceiverId( Number(value) );
      }
    }

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
    {/* <h1 className="text-center my-4">Chat</h1>

    <div className="d-flex justify-content-between mb-1">
        <select name="receiverId" value={receiverId} onChange={handleChange}>
            <option value="1">Maria</option>
            <option value="2">Raul</option>
            <option value="3">Ana</option>
            <option value="4">Sam</option>
        </select>

        <select name="senderId" value={senderId} onChange={handleChange}>
            <option value="1">Maria</option>
            <option value="2">Raul</option>
            <option value="3">Ana</option>
            <option value="4">Sam</option>
        </select>
    </div>

<Chat senderId={senderId} receiverId={receiverId} /> */}
    </div> 
  );
}

export default App;
