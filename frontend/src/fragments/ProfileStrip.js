import React, { useEffect, useState } from 'react';
import './ProfileStrip.css';
import { findUser } from "../data/repository";

function ProfileStrip(props) {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (props && props.user && props.user.username) {
                try {
                    const user = await findUser(props.user.username);
                    setUserDetails(user);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        };

        fetchUserDetails();
    }, [props]);

    if (!userDetails) {
        return null;
    }

    const { username, email, createdAt } = userDetails;
    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="profile-strip">
            <span>{username}</span> | 
            <span>{email}</span> | 
            <span>Date of Joining: {formattedDate}</span>
        </div>
    );
}

export default ProfileStrip;
