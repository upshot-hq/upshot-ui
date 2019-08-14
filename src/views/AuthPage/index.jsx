import React from 'react';
import FontAwesome from 'react-fontawesome';

import './AuthPage.scss';
import { appName } from '../../helpers/defaults';

const AuthPage = () => (
    <div className="authPage">
        <div className="leftSide">
            <div className="container">
                <div className="logo">
                    <h1 className="us-logo">{appName}</h1>
                </div>
                <div className="msg">
                    <p>Making Events</p>
                    <p>Engaging, Fun and Enjoyable</p>
                </div>
                <div className="auth-btn">
                    <button className="us-btn">
                        <div className="icon">
                            <FontAwesome name="google" size="2x" />
                        </div>
                        <span className="text">Signup with google</span>
                    </button>
                </div>
            </div>
        </div>
        <div className="rightSide" />
    </div>
);

export default AuthPage;
