import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function Login() {
  const[logInput,setLogInput]= useState({
    email : "",
    password : ""
  })
  function handleChange(e){
     const{ name , value } = e.target;
     setLogInput({
      ...logInput,
      [name] : value
     })
  }
  async function handleLogSubmit(e) {
    e.preventDefault();
    console.log(logInput);
  }
  return (
    <>
    <div className='login-container'>
      <div className='login-card'>
        <h2>Welcome back</h2>
        <form onSubmit={handleLogSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={logInput.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={logInput.password}
            onChange={handleChange}
          />
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <div  className='login-footer'>
          <span>New account ?</span>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login