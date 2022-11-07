import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from '../StudentView/NavbarStudent'
import './StudentView.css'

import HomeView from '../StudentView/Views/Home/HomeView'
import NotesView from '../StudentView/Views/Notes/NotesView'
import ReflectionView from '../StudentView/Views/Reflection/ReflectionView'
import ResourcesView from '../StudentView/Views/Resources/ResourcesView'
import WeatherView from '../StudentView/Weather/WeatherView'
import NewsView from '../StudentView/News/NewsView'
import ChatView from "../views/ChatView"

function StudentView(props) {
  
  return (
    <div className='StudentView'>
      <div className='nav-area'>
      <Navbar /> 
      </div>
      {/* <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/notes" element={<NotesView/>} />
        <Route path="/reflection" element={<ReflectionView />} />
        <Route path="/resources" element={<ResourcesView/>} />
        <Route path="/chat/:id" element={<ChatView
        // senderId={props.senderId}
        // setSenderIdCb={props.setSenderIdCb}
        // groupId={props.groupId}
        // user={props.user}
        // users={props.users}
        />} />
      </Routes> */}

      <div className='weather-box'>
        <WeatherView/>
      </div>
      <div className='news-box' id='scroll'>
        <NewsView/>
      </div>

    
      </div>
  )
}

export default StudentView
