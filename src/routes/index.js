import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from '../views/NotFoundPage';
import AuthPage from '../views/AuthPage';
import HomePage from '../views/HomePage';
import ProfilePage from '../views/ProfilePage';

const Routes = () => (
    <Switch>
        <Route
            path={['/', '/signin', '/signup']}
            exact
            component={AuthPage}
        />
        <Route
            path="/home"
            exact
            component={HomePage}
        />
        <Route
            path="/profile"
            exact
            component={ProfilePage}
        />
        <Route component={NotFoundPage} />
    </Switch>
);

export default Routes;
