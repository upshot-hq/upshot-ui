import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserDetails, history } from '../../helpers/utils';
import * as UserActions from '../../redux/actionCreators/userActions';

const AuthenticatedView = (props) => {
  const { children, authenticateUserSuccess, logoutUser } = props;

  useEffect(() => {
    const authenticate = async () => {
      const { isAuthenticated, userData } = await getUserDetails();
      if (!isAuthenticated) {
        logoutUser();
        history.push('/');
      } else {
        authenticateUserSuccess({ isAuthenticated, userData });
      }
    };

    authenticate();
  }, [logoutUser, authenticateUserSuccess]);

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

AuthenticatedView.propTypes = {
  children: PropTypes.node.isRequired,
  logoutUser: PropTypes.func.isRequired,
  authenticateUserSuccess: PropTypes.func.isRequired,
};

AuthenticatedView.defaultProps = {
  children: null,
};

export default connect('',
  {
    logoutUser: UserActions.logoutUser,
    authenticateUserSuccess: UserActions.authenticateUserSuccess,
  })(AuthenticatedView);
