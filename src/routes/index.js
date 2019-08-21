import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import authenticateView from '../components/Hoc/authenticateView.jsx';
import AuthenticatedView from '../components/Auth';
import NotFoundPage from '../views/NotFoundPage';
import AuthPage from '../views/AuthPage';
import HomePage from '../views/HomePage';
import ProfilePage from '../views/ProfilePage';
import { getUserDetails } from '../helpers/utils';

const Routes = () => (
    <Switch>
        <Route
            path={['/', '/signin', '/signup']}
            exact
            render={() => {
              const { isAuthenticated } = getUserDetails();
              if (!isAuthenticated) return <AuthPage />;
              return <Redirect to="/home" />;
            }}
        />
        <Route
            path="/home"
            exact
            component={authenticateView(HomePage)}
        />
        <Route
            path="/profile"
            exact
            component={authenticateView(ProfilePage)}
        />
        <Route component={NotFoundPage} />
    </Switch>
);

export default Routes;
