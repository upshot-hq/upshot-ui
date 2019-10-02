import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './NotificationsPage.scss';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import lang from '../../helpers/en.default';
import NotificationCard from '../../components/NotificationCard';

const NotificationsPage = (props) => {
  const { notifications, match } = props;

  const renderTopBar = () => (
		<div className="topbar">
      <PageTitle title={lang.layoutSideNav.notification.title} />
		</div>
  );

  const renderError = (message) => (
		<div className="notifications-page__error">
			<div className="notifications-page__error-message">
				{message}
			</div>
		</div>
  );

  const renderNotifications = () => (
		<div className="notifications-container">
			{
        notifications.map((notification, index) => (
          <NotificationCard key={index} notification={notification} />))
			}
		</div>
  );

  return (
		<Layout match={match}>
			<div className="notifications-page" id="notifications-page">
				<div className="header">
					{renderTopBar()}
				</div>
				<div className="content">
          {!!notifications.length && renderNotifications()}
					{!notifications.length && renderError(lang.notificationsPage.noNotifications)}
				</div>
			</div>
		</Layout>
  );
};

NotificationsPage.propTypes = {
  match: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = ({ notification }) => ({
  notifications: notification.notifications,
});

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(NotificationsPage);
