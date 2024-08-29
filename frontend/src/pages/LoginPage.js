import React from 'react';
import Login from '../fragments/Login';

const LoginPage = (props) => {
    return (
        <div>
            <Login {...props} />
        </div>
    );
};

export default LoginPage;