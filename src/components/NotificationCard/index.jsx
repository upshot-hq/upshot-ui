import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './NotificationCard.scss';
import {
  unread, dbResourceToPageMapping, notificationClassToTabMapping,
} from '../../helpers/defaults';

const NotificationCard = (props) => {
  const { notification } = props;

  const generateRedirectLink = () => {
    const {
      resource_type: resourceType,
      notification_class: notificationClass,
      resource_id: resourceId,
    } = notification;
    const page = dbResourceToPageMapping[resourceType] || '/events';
    const tab = notificationClassToTabMapping[notificationClass] || '';
    let link = `${page}/${resourceId}`;
    if (tab) {
      link = `${link}?tab=${tab}`;
    }

    return link;
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
    <Link to={generateRedirectLink()}>
      <div id="notification-card" className="notification-card">
        {notification.status === unread && <div className="unread-tag" />}
        {renderContent()}
      </div>
    </Link>
  );
};

NotificationCard.propTypes = {
  notification: PropTypes.shape({
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    sender_id: PropTypes.number.isRequired,
    resource_type: PropTypes.string,
    resource_id: PropTypes.number,
    notification_class: PropTypes.string,
  }).isRequired,
};

export default NotificationCard;
