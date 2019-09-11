import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class EventAPI {
  static getEvents(eventData) {
    return axios.post(`${baseUrl}/events`, eventData);
  }

  static getEvent(eventId) {
    return axios.get(`${baseUrl}/events/${eventId}`);
  }

  static postToAnEvent(data) {
    return axios.post(`${baseUrl}/events/${data.eventId}/posts`, data.payload);
  }

  static getPinnedEventsPosts({ limit = 10, offset = 0 }) {
    return axios.get(`${baseUrl}/events/pins/posts?limit=${limit}&offset=${offset}`);
  }
}

export default EventAPI;
