import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import "../style/navbar.css"
import Time from './Time'

const Navbar = () => {
  const [login, setlogin] = useState(localStorage.getItem('login'))
  
  return (
    <nav className='navbar'>
        <div className="logo">
            To Do app
            </div>
          
            <ul className='nav-links'>
                {
              login ?
              <>
                <li><Link to="/">List</Link></li>
                <li><Link to="/add">Add  task</Link></li>
                <li><Link to="/signup">logout</Link></li>
              
                 <div>
                       <Time/>
                 </div>
                       </>:null
}
            </ul>
      
           
        
    </nav>
  )
}

export default Navbar