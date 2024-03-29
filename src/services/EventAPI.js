import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class EventAPI {
  static createEvent(eventData) {
    return axios.post(`${baseUrl}/events`, eventData);
  }

  static getEvent(eventId) {
    return axios.get(`${baseUrl}/events/${eventId}`);
  }

  static getEventPosts({
    eventId, limit, offset, competitionId,
  }) {
    // eslint-disable-next-line
    return axios.get(`${baseUrl}/events/${eventId}/posts?limit=${limit}&offset=${offset}&competition=${competitionId}`);
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

  static pinEvent({ eventId, pin }) {
    const pinString = (pin) ? 'true' : 'false';
    return axios.post(`${baseUrl}/events/${eventId}/pins`, { pin: pinString });
  }

  static bookmarkPost({ postId, bookmark }) {
    const bookmarkString = (bookmark) ? 'true' : 'false';
    return axios
      .post(`${baseUrl}/events/posts/${postId}/bookmarks`, { bookmark: bookmarkString });
  }
}

export default EventAPI;
