import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
function Login({setIsAuthenticated}) {
  const navigate = useNavigate();
  const [logInput, setLogInput] = useState({
    email: "",
    password: ""
  })
  function handleChange(e) {
    const { name, value } = e.target;
    setLogInput({
      ...logInput,
      [name]: value
    })
  }
  async function handleLogSubmit(e) {
    e.preventDefault();
    if (!logInput.email || !logInput.password) {
      toast.warning("All fields are required");
      return
    }
    const url = "http://localhost:9000/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(logInput)
    });
    const result = await response.json();
    const { success, message, name, jwtToken } = result;
    if (success) {
      toast.success(message);
      localStorage.setItem("jwtToken", jwtToken);
      localStorage.setItem("loggedInUser", name);
      setIsAuthenticated(true);
      navigate("/products");
    } else {
      toast.error(message);
    }
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
          <div className='login-footer'>
            <span>New account ?</span>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login