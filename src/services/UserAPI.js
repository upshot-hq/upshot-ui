import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class UserAPI {
  static authenticateUser(userData) {
    return axios.post(`${baseUrl}/users/auth`, userData);
  }

  static updateUserProfile(userData) {
    return axios.put(`${baseUrl}/users/auth`, userData);
  }

  static getUserEvents({ limit, offset }) {
    return axios.get(`${baseUrl}/users/events?limit=${limit}&offset=${offset}`);
  }

  static getUserPosts({ limit, offset }) {
    return axios.get(`${baseUrl}/users/events/posts?limit=${limit}&offset=${offset}`);
  }

  static getUserInfo() {
    return axios.get(`${baseUrl}/users`);
  }
}

export default UserAPI;
