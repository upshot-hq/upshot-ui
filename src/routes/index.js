import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import authenticateView from '../components/Hoc/authenticateView.jsx';
import NotFoundPage from '../views/NotFoundPage';
import AuthPage from '../views/AuthPage';
import HomePage from '../views/HomePage';
import ProfilePage from '../views/ProfilePage';
import { getUserDetails } from '../helpers/utils';
import ExplorePage from '../views/ExplorePage/index';
import EventPage from '../views/EventPage/index';
import SearchPage from '../views/SearchPage/index.jsx';
import NotificationsPage from '../views/NotificationsPage/index.jsx';

const Routes = () => (
  <Switch>
    <Route
      path={['/', '/signin', '/signup', '/login']}
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
    <Route
      path="/explore"
      exact
      component={authenticateView(ExplorePage)}
    />
    <Route
      path="/events/:eventId"
      exact
      component={authenticateView(EventPage)}
    />
    <Route
      path="/notifications"
      exact
      component={authenticateView(NotificationsPage)}
    />
    <Route
      path="/search"
      exact
      component={authenticateView(SearchPage)}
    />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
