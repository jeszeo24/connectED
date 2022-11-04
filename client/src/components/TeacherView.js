import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ReflectionList from '../StudentView/Views/Reflection/ReflectionList'
import NavbarStaff from './NavBarStaff'

function TeacherView(props) {
  const [reflection, setReflection] = useState([]);

  

  useEffect(() => {
      getReflection();  
  }, []);

  async function getReflection() {
      try {
          let response = await fetch('/reflection');  
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
    <div>
        <NavbarStaff />
    <Routes>
        <Route path="" element={<ReflectionList reflection1={reflection}/>} />
        {/* <Route path="chat/2" element={<ChatView/>} /> */}
    </Routes>
    </div>
  )
}

export default TeacherView