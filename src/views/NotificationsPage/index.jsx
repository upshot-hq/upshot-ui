import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './NotificationsPage.scss';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import Loader from '../../components/Loader';
import lang from '../../helpers/en.default';
import NotificationCard from '../../components/NotificationCard';
import { useIntersect } from '../../helpers/hooksUtils';
import * as notificationActions from '../../redux/actionCreators/notificationActions';

const NotificationsPage = (props) => {
  const [setNode, isIntersected] = useIntersect({ threshold: 0.5 });
  const {
    notifications, match, isLoading,
    pagination, getNotifications, errorMessage,
  } = props;
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getNotifications({ isNewFetch: true });
    } else if (!isLoading) {
      const { limit, offset, totalCount } = pagination;
      const fetchMoreNotification = () => {
        if (isIntersected && notifications.length < totalCount) {
          const nextOffset = Number(offset) + Number(limit);
          getNotifications({ limit, offset: nextOffset });
        }
      };

      fetchMoreNotification();
    }
  }, [
    pagination, isIntersected,
    notifications, getNotifications,
    isLoading,
  ]);

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

  const renderFetchMoreTrigger = () => (
    <div className="fetch-more" ref={setNode} />
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
          {renderNotifications()}
          {isLoading && <Loader containerClassName="notifications-page__loader" />}
          {!isLoading && !!errorMessage && renderError(lang.failedToFetch)}
          {!isLoading && !errorMessage && !notifications.length
						&& renderError(lang.notificationsPage.noNotifications)
          }
          {renderFetchMoreTrigger()}
        </div>
      </div>
    </Layout>
  );
};

NotificationsPage.propTypes = {
  match: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  getNotifications: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ notification }) => ({
  notifications: notification.notifications,
  isLoading: notification.isLoading,
  errorMessage: notification.error.message,
  pagination: notification.pagination,
});

const actionCreators = {
  getNotifications: notificationActions.getNotifications,
};

export default connect(mapStateToProps, actionCreators)(NotificationsPage);
