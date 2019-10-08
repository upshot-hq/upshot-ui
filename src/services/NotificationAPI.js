import axios from 'axios';
import { defaultFetchLimit, defaultOffset, booleanStrings } from '../helpers/defaults';

const baseUrl = process.env.REACT_APP_API_URL;

class NotificationAPI {
  static getNotifications({
    limit = defaultFetchLimit, offset = defaultOffset, readAll = booleanStrings.false,
  }) {
    return axios.get(`${baseUrl}/notifications?limit=${limit}&offset=${offset}&readAll=${readAll}`);
  }

  static updateNotificationStatus({ id, status }) {
    return axios.patch(`${baseUrl}/notifications/${id}/status`, { status });
  }
}

export default NotificationAPI;
