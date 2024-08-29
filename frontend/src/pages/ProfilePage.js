import React from 'react';
import '../App.css';
import Profile from '../fragments/Profile';

function ProfilePage(props) {
    return (
        <>
            <Profile {...props} />
        </>
    );
}

export default ProfilePage;