import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from '../StudentView/Navbar'
import './StudentView.css'

import HomeView from '../StudentView/Views/HomeView'
import NotesView from '../StudentView/Views/NotesView'
import ReflectionView from '../StudentView/Views/ReflectionView'
import ResourcesView from '../StudentView/Views/ResourcesView'
import WeatherView from '../StudentView/Views/Weather/WeatherView'
import NewsView from '../StudentView/Views/News/NewsView'

function StudentView() {
  return (
    <div className='StudentView'>

      <Navbar />

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path= "notes" element={<NotesView/>} />
        <Route path="reflection" element={<ReflectionView />} />
        <Route path="resources" element={<ResourcesView/>} />

      </Routes> 

      <div>
        <WeatherView/>
      </div>

      <div>
        <NewsView/>
      </div>


    </div>
  )
}

export default StudentView
