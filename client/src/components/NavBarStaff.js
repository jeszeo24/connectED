import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBarStaff.css'


function NavbarStaff(props) {
  return (
    <div>
    <nav className='NavbarStaff'>
        <ul>
            {/* <li><NavLink to ="/staff-Home"> Home</NavLink></li> */}
            <li><NavLink to ="/staff-reflection">Student Reflections</NavLink></li>
            <li><NavLink to ="/staff-chat/1">Staff Chat</NavLink></li>
        </ul>
    </nav>
    </div>
  )
}

export default NavbarStaff;