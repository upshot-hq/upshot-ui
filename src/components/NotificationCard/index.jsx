import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './NotificationCard.scss';
import { unread, read } from '../../helpers/defaults';

const NotificationCard = (props) => {
  const { notification: reduxNotification, handleNotificationStatusUpdate } = props;
  const [notification, setNotification] = useState(reduxNotification);


  const handleClick = () => {
    handleNotificationStatusUpdate({
      id: notification.id,
      status: read,
    });
    setNotification({ ...notification, status: read });
  };

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
    <div id="notification-card" className="notification-card" onClick={handleClick}>
      {notification.status === unread && <div className="unread-tag" />}
      {renderContent()}
    </div>
  );
};

NotificationCard.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    sender_id: PropTypes.number.isRequired,
  }).isRequired,
  handleNotificationStatusUpdate: PropTypes.func.isRequired,
};

export default NotificationCard;
