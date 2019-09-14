import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class EventAPI {
  static createEvent(eventData) {
    return axios.post(`${baseUrl}/events`, eventData);
  }

  static getEvent(eventId) {
    return axios.get(`${baseUrl}/events/${eventId}`);
  }

  static getEventPosts({ eventId, limit, offset }) {
    return axios.get(`${baseUrl}/events/${eventId}/posts?limit=${limit}&offset=${offset}`);
  }

  static postToAnEvent(data) {
    return axios.post(`${baseUrl}/events/${data.eventId}/posts`, data.payload);
  }

  static getPinnedEventsPosts({ limit = 10, offset = 0 }) {
    return axios.get(`${baseUrl}/events/pins/posts?limit=${limit}&offset=${offset}`);
  }

  static likePost({ postId, like }) {
    const likeString = (like) ? 'true' : 'false';
    return axios.post(`${baseUrl}/events/posts/${postId}/likes`, { like: likeString });
  }

  static dislikePost({ postId, dislike }) {
    const dislikeString = (dislike) ? 'true' : 'false';
    return axios.post(`${baseUrl}/events/posts/${postId}/dislikes`, { dislike: dislikeString });
  }
}

export default EventAPI;
