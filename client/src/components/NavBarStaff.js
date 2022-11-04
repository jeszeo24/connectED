import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBarStaff.css'


function NavbarStaff(props) {
  return (
    <div>
    <nav className='NavbarStaff'>
        <ul>
            <li><NavLink to ="/staff-Home"> Home</NavLink></li>
            <li><NavLink to ="/staff-Reflection">Reflection</NavLink></li>
            <li><NavLink to ="/staff-Chat">Chat</NavLink></li>
        </ul>
    </nav>
    </div>
  )
}

export default NavbarStaff;