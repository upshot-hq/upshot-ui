import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from '../views/NotFoundPage';
import AuthPage from '../views/AuthPage';

const Routes = () => (
    <Switch>
        <Route
            path={['/', '/signin', '/signup']}
            exact
            component={AuthPage}
        />
        <Route component={NotFoundPage} />
    </Switch>
);

export default Routes;
