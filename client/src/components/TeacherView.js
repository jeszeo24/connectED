import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ReflectionList from '../StudentView/Views/Reflection/ReflectionList'
import NavbarStaff from './NavBarStaff'
import ChatView from "../views/ChatView";

// NOTE: Not using, moved to direct to ReflectionList on App parent
function TeacherView(props) {
//   const [reflection, setReflection] = useState([]);

  

//   useEffect(() => {
//       getReflection();  
//   }, []);

//   async function getReflection() {
//       try {
//           let response = await fetch('/reflection');  
//           if (response.ok) {
//               let result = await response.json();
//               setReflection(result);
//           } else {
//               console.log(`Server error: ${response.status} ${response.statusText}`);
//           }
//       } catch (err) {
//           console.log(`Server error: ${err.message}`);
//       }
//   }

  return (
    <div>
        <NavbarStaff />
    </div>
  )
}

export default TeacherView