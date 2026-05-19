import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/addtask.css'; // Reusing your awesome 3D CSS!

const SignUp = () => {
  
  const [formData, setFormData] = useState({ 
    name:"",
    email: "", 
    password: "" 
  
  });
  const navigate = useNavigate();
 useEffect(()=>{
    if(localStorage.getItem('login')){
      navigate('/')
    }
  },[navigate])
  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      // Calling the backend signup route
      let response = await fetch('http://localhost:3500/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });
      
      let results = await response.json();

     
      
      if (results.success) {
        alert("Account created successfully! Please log in.");
        document.cookie="token="+results.token
         localStorage.setItem('login',formData.email)
         localStorage.setItem('userName', formData.name);
         window.dispatchEvent(new Event('localStorage-littleSLOW'));
        navigate('/'); 
      } else {
        alert(result. message); // Show error (e.g., "Email already in use")
      }
    } catch (error) {
      console.log("Signup Error:", error);
    }
  };

  return (
    <div className='cont' style={{ marginTop: '10vh' }}>
      <h1>Create Account</h1>
      
      <form onSubmit={handleSignup}> 
         <div className='from-top'>

          <label>Full Name</label>
        <input   
          type="text"  
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          placeholder='ENTER NAME'
          required
        />
         
        <label>Email Address</label>
        <input   
          type="email"  
          value={formData.email} 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          placeholder='ENTER EMAIL'
          required
        />
        
        <label>Create Password</label>
        <input   
          type="password"  
          value={formData.password} 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          placeholder='CREATE PASSWORD'
          required
        />

        <button type='submit' className='submmit' >Register Now</button>
         </div>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--neon-blue)', fontWeight: 'bold', textDecoration: 'none' }}>
            Log In
        </Link>
      </p>
    </div>
  )
}

export default SignUp;