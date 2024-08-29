import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../data/repository';
import './SignUp.css';

import email_icon from '../images/email.png';
import password_icon from '../images/password.png';
import user_icon from '../images/person.png';

function SignUp(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [welcomeUsername, setWelcomeUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form
        const { trimmedFields, isValid } = handleValidation();
        if (!isValid) return;

        // Create user
        try {
            const user = await createUser({
                username: trimmedFields.username,
                email: trimmedFields.email,
                password: trimmedFields.password
            });

            if (user) {
                props.loginUser(user);
                setWelcomeUsername(trimmedFields.username);
                setShowModal(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setErrors({ ...errors, email: 'Error signing up, please try again.' });
        }
    };

    const handleValidation = () => {
        const trimmedFields = trimFields();
        const currentErrors = {};

        if (!validateEmail(trimmedFields.email)) {
            currentErrors.email = 'Please enter a valid email address.';
        }
        if (!validatePassword(trimmedFields.password)) {
            currentErrors.password = 'Password must be at least 8 characters long and contain a mix of upper and lower case letters, numbers, and special characters.';
        }
        if (trimmedFields.password !== trimmedFields.confirmPassword) {
            currentErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(currentErrors);
        return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
    };

    const trimFields = () => {
        const trimmedFields = {};
        Object.keys({ username, email, password, confirmPassword }).forEach(key => {
            trimmedFields[key] = eval(key).trim();
        });
        setUsername(trimmedFields.username);
        setEmail(trimmedFields.email);
        setPassword(trimmedFields.password);
        setConfirmPassword(trimmedFields.confirmPassword);
        return trimmedFields;
    };

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validatePassword = (password) => {
        if (password.length < 8) return false;
        if (!/[A-Z]/.test(password)) return false;
        if (!/[a-z]/.test(password)) return false;
        if (!/\d/.test(password)) return false;
        if (!/[$@$!%*?&]/.test(password)) return false;
        return true;
    };

    return (
        <div className='container'>
            <div className="header1">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder='Email Id' value={email} onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: '' }); }} />
                </div>
                {errors.email && <p className="error">{errors.email}</p>}
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: '' }); }} />
                </div>
                {errors.password && <p className="error">{errors.password}</p>}
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setErrors({ ...errors, confirmPassword: '' }); }} />
                </div>
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
            <div className="register-link">
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
            <div className='submit-container'>
                <div className="submit" onClick={handleSubmit}>Sign Up</div>
            </div>
            {showModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={() => setShowModal(false)}>&times;</span>
                        <p className="welcome-message">Welcome, {welcomeUsername}!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignUp;
