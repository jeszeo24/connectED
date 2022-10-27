import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'


function Navbar() {
  return (
    <div>
    <nav className='Navbar'>
        <ul>
            <li><NavLink to ="/"> Home</NavLink></li>
            <li><NavLink to ="notes">Notes</NavLink></li>
            <li><NavLink to ="reflection">Reflection</NavLink></li>
            <li><NavLink to ="resources">Resources</NavLink></li>
        </ul>
    </nav>
    </div>
  )
}

export default Navbar