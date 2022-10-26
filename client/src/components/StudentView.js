import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from '../StudentView/Navbar'
import './StudentView.css'

import HomeView from '../StudentView/Views/HomeView'
import NotesView from '../StudentView/Views/NotesView'
import ReflectionView from '../StudentView/Views/ReflectionView'
import ResourcesView from '../StudentView/Views/ResourcesView'

function StudentView() {
  return (
    <div className='StudentView'>
      <h2>Homepage</h2>
{/* 
      <Navbar />

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path= "notes" element={<NotesView/>} />
        <Route path="reflections" element={<ReflectionView />} />
        <Route path="resources" element={<ResourcesView/>} />

      </Routes> */} 


    </div>
  )
}

export default StudentView
