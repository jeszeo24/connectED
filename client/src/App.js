import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import StudentView from "./components/StudentView";
import TeacherView from "./components/TeacherView";
import './App.css';

import Local from './helpers/Local';
import Api from './helpers/Api';

import NavBar from './components/NavBar';

import PrivateRoute from './components/PrivateRoute';
import LoginView from './views/LoginView';
import ChatView from "./views/ChatView";
import ReflectionList from "./StudentView/Views/Reflection/ReflectionList";
import WeatherView from "./StudentView/Weather/WeatherView";

function App() {
  const [isStudent, setIsStudent] = useState (true);
  const [user, setUser] = useState(Local.getUser()); // sets logged in user
  const [senderId, setSenderId] = useState(1);
  const [groupId, setGroupId] = useState(2);
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [users, setUsers] = useState([]); // lists of users
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
        Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
        setUser(myresponse.data.user);
        setLoginErrorMsg('');
        navigate('/');
    } else {
        setLoginErrorMsg('Login failed');
    }
}

console.log(user);

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    // (NavBar will send user to home page)
  }

  async function fetchUsers() {
    let myresponse = await Api.getUsers();
    if (myresponse.ok) {
      setUsers(myresponse.data);
    } else {
      console.log("response not ok");
    }
  }

  const handleChangeView = (isStudent) => {
    setIsStudent(isStudent);
  };


  return (
    <div className="App">
      <NavBar user={user} logoutCb={doLogout} />
    <h1>connectED</h1>
      <nav className="user">
      <button className={isStudent? "active" : null} onClick={(e) => handleChangeView(true)}>STUDENT</button>
      <button className={!isStudent? "active" : null} onClick={(e) => handleChangeView(false)}>TEACHER</button>
    </nav> 

    <div className="main"> 

    <Routes>
      <Route 
              path="/login" 
              element={
                <LoginView 
                loginCb={(u, p) => doLogin(u, p)} 
                loginError={loginErrorMsg} 
                  />
                } 
              />
        <Route
              path="/:id/chat"
              element={
                <ChatView
                  senderId={senderId}
                  setSenderIdCb={setSenderId}
                  groupId={groupId}
                  user={user}
                  users={users}
                />
              }
            />
        {user.isStaff} ? { user.isStaff ? 
        <Route 
              path="/staff" 
              element={
                <PrivateRoute>
                    <TeacherView/> 
                </PrivateRoute>
                } /> : 
        <Route 
              path="/student" 
              element={
                  <PrivateRoute>
                      <StudentView/> 
                  </PrivateRoute>
                  } />
          } : {null};
      </Routes>
    
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
