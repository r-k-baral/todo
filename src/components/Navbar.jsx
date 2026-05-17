import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import "../style/navbar.css"
import Time from './Time'

const Navbar = () => {
  const [login, setlogin] = useState(localStorage.getItem('login'))

// 2. Re-check localStorage every time the URL changes
 useEffect(()=>{
  const handleStorageSlowFix= ()=>{
    setlogin(localStorage.getItem('login'))
  }
  window.addEventListener("localStorage-littleSLOW", handleStorageSlowFix)
return () => {
      window.removeEventListener("localStorage-littleSLOW", handleStorageSlowFix);
    };
 },[])

// Clear the storage
    // You might also want to clear your token cookie here
  const handleLogout = () => {
    localStorage.removeItem('login'); 
    setlogin(null);
  };
  
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
                <li><Link to="/login" onClick={handleLogout}>logout</Link></li>
              
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