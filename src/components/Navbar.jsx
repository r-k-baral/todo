import { Link } from 'react-router-dom'
import React from 'react'
import "../style/navbar.css"
import Time from './Time'

const Navbar = () => {
 
  return (
    <nav className='navbar'>
        <div className="logo">
            To Do app
            </div>
            <ul className='nav-links'>
                <li><Link to="/">List</Link></li>
                <li><Link to="/add">Add  task</Link></li>
                <li>
        
        </li>
                 <div>
                       <Time/>
                 </div>
            </ul>
           
        
    </nav>
  )
}

export default Navbar