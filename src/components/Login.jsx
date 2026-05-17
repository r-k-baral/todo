import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/addtask.css'; // Reusing the 3D CSS!

const Login = () => {
  
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "" 
  });
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('login')){
      navigate('/')
    }
  },[navigate])

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      let response = await fetch('http://localhost:3500/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });
      
       if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

      let result = await response.json();
      
      if (result.success) {
        
       document.cookie="token="+result.token;
       localStorage.setItem('login',formData.email)
       window.dispatchEvent(new Event('localStorage-littleSLOW'))
      
        navigate('/'); 
       
      } 
      else {
        alert(result.message); // "Incorrect password", "User not found", etc.
      }
    } catch (error) {
      console.log("Login Error:", error);
    }
  };

  return (
    <div className='cont' style={{ marginTop: '10vh' }}>
      <h1>System Login</h1>
      
      <form onSubmit={handleLogin}> 
         <div className='from-top'>
         
        <label>Email Address</label>
        <input   
          type="email"  
          value={formData.email} 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          placeholder='ENTER EMAIL'
          required
        />
        
        <label>Password</label>
        <input   
          type="password"  
          value={formData.password} 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          placeholder='ENTER PASSWORD'
          required
        />

        <button type='submit' className='submmit'>Access System</button>
         </div>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: 'var(--neon-blue)', fontWeight: 'bold', textDecoration: 'none' }}>
            Sign Up
        </Link>
      </p>
    </div>
  )
}

export default Login;