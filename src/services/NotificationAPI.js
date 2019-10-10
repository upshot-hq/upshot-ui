import axios from 'axios';
import { defaultFetchLimit, defaultOffset, booleanStrings } from '../helpers/defaults';

const baseUrl = process.env.REACT_APP_API_URL;

class NotificationAPI {
  static getNotifications({
    limit = defaultFetchLimit, offset = defaultOffset, readAll = booleanStrings.false,
  }) {
    return axios.get(`${baseUrl}/notifications?limit=${limit}&offset=${offset}&readAll=${readAll}`);
  }

  static getNotificationRecipient(notificationId) {
    return axios.get(`${baseUrl}/notifications/${notificationId}/recipient`);
  }

  static getUnreadNotificationCount() {
    return axios.get(`${baseUrl}/notifications/count`);
  }
}

export default NotificationAPI;
