import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class EventAPI {
  static getEvents(eventData) {
    return axios.post(`${baseUrl}/events`, eventData);
  }

  static postToAnEvent(data) {
    return axios.post(`${baseUrl}/events/${data.eventId}/posts`, data.payload);
  }
}

export default EventAPI;
