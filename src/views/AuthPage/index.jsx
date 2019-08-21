import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import GoogleLogin from 'react-google-login';

import './AuthPage.scss';
import { appName } from '../../helpers/defaults';
import { getUserDetails, history } from '../../helpers/utils';
import lang from '../../helpers/en.default';
import {
  authenticateUser,
  authenticateUserFailure,
} from '../../redux/actionCreators/userActions';

export const AuthPage = (props) => {
  const authenticate = async () => {
    const { isAuthenticated } = await getUserDetails();
    if (isAuthenticated) {
      history.push('/home');
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  const handleAuth = (response) => {
    const {
      familyName: lastname,
      givenName: firstname,
      email,
      imageUrl,
    } = response.profileObj;

    props.authenticateUser({
      firstname, lastname, email, imageUrl,
    });
  };

  const handleAuthFailure = (response) => {
    props.authenticateUserFailure({ ...response.error, message: lang.authenticatonErrorMessage });
  };

  const renderBtn = (renderProps) => (
    <button className="us-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
        <div className="icon">
            <FontAwesome name="google" size="2x" />
        </div>
        <span className="text">Signin with google</span>
    </button>
  );

  const renderGoogleSigninBtn = () => (
    <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={renderBtn}
        buttonText="Login"
        onSuccess={handleAuth}
        onFailure={handleAuthFailure}
        cookiePolicy={'single_host_origin'}
    />
  );

  return (
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
                    {renderGoogleSigninBtn()}
                </div>
            </div>
        </div>
        <div className="rightSide" />
    </div>
  );
};

AuthPage.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  authenticateUserFailure: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  isLoading: auth.isLoading,
  authError: auth.errors,
});

const mapDispatchToProps = {
  authenticateUser,
  authenticateUserFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
