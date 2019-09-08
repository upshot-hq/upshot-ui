import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class ExploreAPI {
  static getExploreContent({ limit, offset, filter }) {
    return axios.post(`${baseUrl}/explore?limit=${limit}&offset=${offset}&filter=${filter}`);
  }
}

export default ExploreAPI;
