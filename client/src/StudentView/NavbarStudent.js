import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavbarStudent.css'


function NavbarStudent(props) {
  return (
    <div>
    <nav className='Navbar'>
        <ul>
          {/* <NavLink> is a special kind of <Link> that knows whether or not it is "active" */}
            <li><NavLink to ="/home"> Home</NavLink></li>
            <li><NavLink to ="/notes">Notes</NavLink></li>
            <li><NavLink to ="/reflection">Reflection</NavLink></li>
            <li><NavLink to ="/resources">Resources</NavLink></li>
            <li><NavLink to ="/chat/2">Student Chat</NavLink></li>
        </ul>
    </nav>
    </div>
  )
}

export default NavbarStudent;