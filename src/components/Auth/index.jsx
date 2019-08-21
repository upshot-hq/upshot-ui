import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserDetails, history } from '../../helpers/utils';
import * as UserActions from '../../redux/actionCreators/userActions';

const AuthenticatedView = (props) => {
  const { children, authenticateUserSuccess, logoutUser } = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authenticate = () => {
      const { isAuthenticated, userData } = getUserDetails();
      if (!isAuthenticated) {
        logoutUser();
        history.push('/');
      } else {
        authenticateUserSuccess({ isAuthenticated, userData });
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    authenticate();
  });

  return (
    <Fragment>
      {isLoading ? null : children}
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

const actionCreators = {
  logoutUser: UserActions.logoutUser,
  authenticateUserSuccess: UserActions.authenticateUserSuccess,
};

export default connect('', actionCreators)(AuthenticatedView);
