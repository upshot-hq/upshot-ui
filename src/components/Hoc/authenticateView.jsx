import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserDetails, history } from '../../helpers/utils';
import * as UserActions from '../../redux/actionCreators/userActions';

export default function (View) {
  class AuthenticatedView extends Component {
    state = {
      isLoading: true,
    }

    async componentDidMount() {
      await this.authenticate();
    }

    authenticate = async () => {
      const { isAuthenticated, userData } = await getUserDetails();

      if (!isAuthenticated) {
        this.props.logoutUser();
        history.push('/');
      } else {
        this.props.authenticateUserSuccess({ isAuthenticated, userData });
      }

      this.setState({ isLoading: false });
    };

    render() {
      return (
        <Fragment>
          {!this.state.isLoading && <View {...this.props} />}
        </Fragment>
      );
    }
  }

  AuthenticatedView.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    authenticateUserSuccess: PropTypes.func.isRequired,
  };

  const actionCreators = {
    logoutUser: UserActions.logoutUser,
    authenticateUserSuccess: UserActions.authenticateUserSuccess,
  };

  return connect('', actionCreators)(AuthenticatedView);
}
