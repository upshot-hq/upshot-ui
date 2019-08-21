import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserDetails, history } from '../../helpers/utils';

const AuthenticatedView = (props) => {
  const { children } = props;
  const authenticate = async () => {
    const { isAuthenticated } = await getUserDetails();
    if (!isAuthenticated) {
      history.push('/');
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

AuthenticatedView.propTypes = {
  children: PropTypes.node.isRequired,
};

AuthenticatedView.defaultProps = {
  children: null,
};

const mapStateToProps = ({ auth }) => ({
  isLoading: auth.isLoading,
  authError: auth.errors,
});

const mapDispatchToProps = {
  authenticateUser,
  authenticateUserFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedView);
