import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import GoogleLogin from 'react-google-login';

import './AuthPage.scss';
import { appName } from '../../helpers/defaults';
import lang from '../../helpers/en.default';
import * as userActions from '../../redux/actionCreators/userActions';
import * as utils from '../../helpers/utils';

export const AuthPage = (props) => {
  const { authenticateUser, authenticateUserFailure, logoutUser } = props;

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  const handleAuth = async (response) => {
    const ups = await utils.hashData(process.env.REACT_APP_AUTH_SECRET);
    const {
      familyName: lastname,
      givenName: firstname,
      email,
      imageUrl,
    } = response.profileObj;

    console.log({ firstname, lastname, email, imageUrl })

    authenticateUser({
      firstname,
      lastname: lastname || firstname,
      email,
      imageUrl,
      ups,
    });
  };

  const handleAuthFailure = (response) => {
    authenticateUserFailure({ ...response.error, message: lang.authenticatonErrorMessage });
  };

  const renderBtn = (renderProps) => (
    <button className="us-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
      <div className="icon">
        <FontAwesome name="google" size="2x" />
      </div>
      <div className="text">
        <span>{lang.authPage.signupText}</span>
      </div>
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
            <p>Engaging, Fun and Enjoyable.</p>
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
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  isLoading: auth.isLoading,
  authError: auth.errors,
});

const mapDispatchToProps = {
  authenticateUser: userActions.authenticateUser,
  authenticateUserFailure: userActions.authenticateUserFailure,
  logoutUser: userActions.logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
