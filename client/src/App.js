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
import RegisterView from "./views/RegisterView";
import HomeView from './StudentView/Views/Home/HomeView'
import NotesView from './StudentView/Views/Notes/NotesView'
import ReflectionView from "./StudentView/Views/Reflection/ReflectionView";
import ReflectionList from "./StudentView/Views/Reflection/ReflectionList";
import ResourcesView from './StudentView/Views/Resources/ResourcesView'
import WeatherView from './StudentView/Weather/WeatherView'
import NewsView from './StudentView/News/NewsView'

function App() {
  const [isStudent, setIsStudent] = useState (true);
  const [user, setUser] = useState(Local.getUser()); // sets logged in user
  const [senderId, setSenderId] = useState(1);
  const [groupId, setGroupId] = useState();
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]); // lists of users
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

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

  // register a new user
  async function register(email, username, password, isStaff) {
    let myresponse = await Api.newUser(
      email,
      username,
      password,
      isStaff
    );
    if (myresponse.ok) {
      // browser popup saying you've been registered
      alert("You have been registered!");
      //  log them in automatically
      await doLogin(username, password);
    } else {
      setLoginErrorMsg("Registration failed");
    }
  }

   // get group by id
   async function getGroup(id) {
    let myresponse = await Api.getGroup(id);
    if (myresponse.ok) {
      setGroupId(myresponse.data.id);
      //navigate to trip/id page after
      navigate(`/group/${id}`);
    } else {
      setError(myresponse.error);
    }
  }

   useEffect(() => {
    setGroup();
  }, []);

  function setGroup() {
    if (user.isStaff === true) {
      setGroupId(1);
    } else {
      setGroupId(2);
    }
  }

  return (
    <div className="App">
      <NavBar user={user} logoutCb={doLogout} />
    <h1>connectED</h1>
      {/* <nav className="user">
      <button className={isStudent? "active" : null} onClick={(e) => handleChangeView(true)}>STUDENT</button>
      <button className={!isStudent? "active" : null} onClick={(e) => handleChangeView(false)}>TEACHER</button>
    </nav>  */}

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
              path="/register"
              element={<RegisterView registerCb={register} />}
            />
      <Route
              path="/chat" // channelname (ChatView row 50)
              element={
                <ChatView
                  senderId={Number(Local.getUserId())}
                  groupId={groupId}
                  user={user}
                  users={users}
                />
              }
            />
        <Route path="/home" element={<HomeView />} /> 
        <Route path="/notes" element={<NotesView/>} />
        <Route path="/reflection" element={<ReflectionView />} />
        <Route path="/resources" element={<ResourcesView/>} />

        {/* <Route path="/staff-Reflection" element={<ReflectionList/>} /> */}
  

        {user && user.isStaff ? 
        <Route 
              path="/" 
              element={
                <PrivateRoute>
                    <TeacherView/> 
                </PrivateRoute>
                } /> : 
        <Route 
              path="/" 
              element={
                  <PrivateRoute>
                      <HomeView // formerly StudentView (but now defunct because unable to nest components within)
                      // senderId={senderId}
                      // setSenderGroupCb={setSenderGroup}
                      // groupId={groupId}
                      // user={user}
                      // users={users}
                      /> 
                  </PrivateRoute>
                  } />
          }
      </Routes>

      {/* <h1 className="text-center my-4">Chat.</h1>

            <div className="d-flex justify-content-between mb-1">
                <select name="groupId" value={groupId} onChange={handleChange}>
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

            <ChatView senderId={senderId} groupId={groupId} /> */}
    
    </div> 
    
    </div> 
  );
}

export default App;
