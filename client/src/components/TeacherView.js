import React, { useEffect, useState } from 'react'
import ReflectionList from '../StudentView/Views/Reflection/ReflectionList'

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
    <ReflectionList reflection1={reflection}/>
    </div>
  )
}

export default TeacherView