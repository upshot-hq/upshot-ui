import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class EventAPI {
  static getEvents(eventData) {
    return axios.post(`${baseUrl}/events`, eventData);
  }
}

export default EventAPI;
