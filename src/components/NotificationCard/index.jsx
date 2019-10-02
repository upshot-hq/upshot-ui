import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './NotificationCard.scss';
import { unread } from '../../helpers/defaults';

const NotificationCard = (props) => {
  const { notification } = props;

  const renderContent = () => {
    let time = moment(notification.created_at);
    time = time.calendar();

    return (
      <div className="notification-card__content">
        <div className="header">
          <div className="title">{notification.title}</div>
          <div className="time">{time}</div>
        </div>
        <div className="text">{notification.message}</div>
      </div>
    );
  };

  return (
    <div id="notification-card" className="notification-card">
      {notification.status === unread && <div className="unread-tag" />}
      {renderContent()}
    </div>
  );
};

NotificationCard.propTypes = {
  notification: PropTypes.shape({
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    senderId: PropTypes.number.isRequired,
  }).isRequired,
};

export default NotificationCard;
