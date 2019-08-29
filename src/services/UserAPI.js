import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class UserAPI {
  static authenticateUser(userData) {
    return axios.post(`${baseUrl}/users/auth`, userData);
  }

  static updateUserProfile(userData) {
    return axios.put(`${baseUrl}/users/auth`, userData);
  }
}

export default UserAPI;
