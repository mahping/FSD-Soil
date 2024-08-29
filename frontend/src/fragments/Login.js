import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../data/repository";
import './SignUp.css'; 
import email_icon from '../images/person.png';
import password_icon from '../images/password.png';

export default function Login(props) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = await verifyUser(fields.username, fields.password);

    if (user.error) {
      // Login failed, display custom error message.
      setErrorMessage(user.error);
      return;
    }

    // Set user state.
    props.loginUser(user);

    // Show success modal and navigate to the profile page after 2 seconds.
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className='container'>
      <div className="header1">
        <div className="text">Login</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="text"
              name="username"
              placeholder='Username'
              value={fields.username}
              onChange={handleInputChange}
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={fields.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="register-link">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
        <div className='submit-container'>
          <div className="submit" onClick={handleSubmit}>Login</div>
        </div>
      </form>
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowModal(false)}>&times;</span>
            <p className="welcome-message">Welcome, {fields.username}!</p>
          </div>
        </div>
      )}
    </div>
  );
}
