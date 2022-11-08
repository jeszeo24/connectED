import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import StudentView from "./components/StudentView";
import TeacherView from "./components/TeacherView";
import "./App.css";

import Local from "./helpers/Local";
import Api from "./helpers/Api";

import NavBar from "./components/NavBar";

import PrivateRoute from "./components/PrivateRoute";
import LoginView from "./views/LoginView";
import ChatView from "./views/ChatView";
import RegisterView from "./views/RegisterView";
import HomeView from "./StudentView/Views/Home/HomeView";
import NotesView from "./StudentView/Views/Notes/NotesView";
import ReflectionView from "./StudentView/Views/Reflection/ReflectionView";
import ReflectionList from "./StudentView/Views/Reflection/ReflectionList";
import ResourcesView from "./StudentView/Views/Resources/ResourcesView";
import WeatherView from "./StudentView/Weather/WeatherView";
import NewsView from "./StudentView/News/NewsView";
import UsersView from "./views/UsersView";
import ProfileView from "./views/ProfileView";

function App() {
  const [isStudent, setIsStudent] = useState(true);
  const [user, setUser] = useState(Local.getUser()); // sets logged in user
  const [senderId, setSenderId] = useState(1);
  const [groupId, setGroupId] = useState();
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]); // lists of users
  const [reflection, setReflection] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      // saves token and user in Local (local storage)
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user); // but also want to set state to display different user in NavBar
      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
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
    let myresponse = await Api.newUser(email, username, password, isStaff);
    if (myresponse.ok) {
      // browser popup saying you've been registered
      alert("You have been registered!");
      //  log them in automatically
      await doLogin(username, password);
    } else {
      setLoginErrorMsg("Registration failed");
    }
  }

  // get group chat by id
  async function getGroupChat(id) {
    let myresponse = await Api.getGroupChat(id);
    if (myresponse.ok) {
      setGroupId(myresponse.data.groupId);
      //navigate to chat/id page after
      navigate(`/chat/${id}`);
    } else {
      setError(myresponse.error);
    }
  }

  // NOTE: Setting Group as below does NOT work
  //  useEffect(() => {
  //   setGroup();
  // }, []);

  // function setGroup() {
  //   if (user.isStaff === true) {
  //     setGroupId(1);
  //   } else {
  //     setGroupId(2);
  //   }
  // }

  // console.log(groupId)

  // // navigates to chat for selected tri
  // function goToChatView(id) {
  //   navigate(`/chat/${id}`);
  // }

  useEffect(() => {
    getReflection();
  }, []);

  async function getReflection() {
    try {
      let response = await fetch("/reflection");
      if (response.ok) {
        let result = await response.json();
        setReflection(result);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
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
        {/* Routes must be defined*/}
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
            path="/users"
            element={
              <PrivateRoute>
                <UsersView />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <PrivateRoute>
                <ProfileView />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomeView />
              </PrivateRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <NotesView />
              </PrivateRoute>
            }
          />
          <Route
            path="/reflection"
            element={
              <PrivateRoute>
                <ReflectionView />
              </PrivateRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <PrivateRoute>
                <ResourcesView />
              </PrivateRoute>
            }
          />

          <Route
            path="/chat/:groupId" // channelname (ChatView row 50)
            element={
              <PrivateRoute>
                <ChatView
                  senderId={Number(Local.getUserId())}
                  groupId={2}
                  user={user}
                  users={users}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/staff-chat/:groupId" // channelname (ChatView row 50)
            element={
              <ChatView
                senderId={Number(Local.getUserId())}
                groupId={Number(Local.getisStaff())}
                user={user}
                users={users}
              />
            }
          />
          {/* <Route path="/teacher-view" element={<TeacherView />} /> */}

          <Route
            path="/staff-reflection"
            element={
              <PrivateRoute>
                <ReflectionList reflection1={reflection} />
              </PrivateRoute>
            }
          />

          {user && user.isStaff ? (
            <Route
              path="/"
              element={
                <PrivateRoute>
                  {/* <TeacherView />  // formerly TeacherView (but now defunct because was unable to nest components within)*/}
                  <ReflectionList reflection1={reflection} />
                </PrivateRoute>
              }
            />
          ) : (
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomeView // formerly StudentView (but now defunct because was unable to nest components within)
                  // senderId={senderId}
                  // setSenderGroupCb={setSenderGroup}
                  // groupId={groupId}
                  // user={user}
                  // users={users}
                  />
                </PrivateRoute>
              }
            />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
