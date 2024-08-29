import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { findUser, updateUser, deleteUser } from "../data/repository";

export function Profile(props) {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        dateOfJoining: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false); 
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (props && props.user && props.user.username) {
                try {
                    const fetchedUser = await findUser(props.user.username);
                    setUser({
                        ...fetchedUser,
                        dateOfJoining: new Date(fetchedUser.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })
                    });
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        };

        fetchUserDetails();
    }, [props]);

    const handleEditToggle = () => {
        setEditMode(!editMode);
        setMessage('');
    };

    const handleUpdateProfile = async () => {
        try {
            await updateUser(user.username, { email: user.email }); // Only update email
            setEditMode(false);
            setShowUpdateModal(true);
            setTimeout(() => {
                setShowUpdateModal(false);
            }, 2000);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleDeleteProfile = async () => {
        try {
            await deleteUser(user.username);
            setShowLogoutModal(true);

            setTimeout(() => {
                setShowLogoutModal(false);
                props.logoutUser();
                navigate('/');
            }, 3000); 
        } catch (error) {
            console.error("Error deleting profile:", error);
        }
    };

    return (
        <div className="profile-container">
            {message && <div className="profile-status-message">{message}</div>}
            {showLogoutModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={() => setShowLogoutModal(false)}>&times;</span>
                        <p>Profile Deleted and Logged Out</p>
                    </div>
                </div>
            )}
            {showUpdateModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={() => setShowUpdateModal(false)}>&times;</span>
                        <p>Profile Updated Successfully</p>
                    </div>
                </div>
            )}
            <div className="profile-info">
                <h2>Profile</h2>
                <p className="profile-name">Username: {user.username}</p>
                <div className="profile-email">
                    <p className="profile-name">Email:</p>
                    {editMode ? (
                        <input
                            type="email"
                            className="profile-edit-input"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    ) : (
                        <p className="profile-email">{user.email}</p>
                    )}
                </div>
                <p className="profile-doj">Date of Joining: {user.dateOfJoining || 'Not available'}</p>
                <div className="profile-actions">
                    {editMode ? (
                        <>
                            <button className="profile-update" onClick={handleUpdateProfile}>Update Email</button>
                            <button className="profile-cancel" onClick={handleEditToggle}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button className="profile-edit" onClick={handleEditToggle}>Edit Email</button>
                            <button className="profile-delete" onClick={handleDeleteProfile}>Delete Profile</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
