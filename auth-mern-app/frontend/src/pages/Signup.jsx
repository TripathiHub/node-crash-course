import { useState } from "react";
import { Link } from "react-router-dom";
import {ToastContainer} from "react-toastify"
function Signup() {
  const[formInput,setFormInput] = useState({
    name : "",
    email : "",
    password : ""
  })
  function handleChange(e){
     const {name,value} = e.target;
     setFormInput({
      ...formInput,
      [name] : value
     });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formInput);
  }
  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">Create Account</h2>

        <p className="auth-subtitle">
          Sign up to get started
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            autoFocus
            value={formInput.name}
            onChange={handleChange}
            placeholder="Enter your name..."
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
            placeholder="Enter your email..."
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formInput.password}
            onChange={handleChange}
            placeholder="Enter your password..."
          />

          <button type="submit" className="auth-button">
            Sign Up
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/login">Login</Link>
        </div>
         <ToastContainer/>
      </div>
    </div>
  );
}

export default Signup;