import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify"
function Signupauth() {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: ""
  })
  function handleChange(e) {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formInput.email || !formInput.password || !formInput.name) {
      toast.warning("All feilds are required");
      return
    }
    const url = "http://localhost:9000/signup"
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formInput)
    });
    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
      setTimeout(()=>{
          navigate("/login");
      },1000)
    } else {
      toast.error(result.message);
    }
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
      </div>
    </div>
  );
}

export default Signupauth;