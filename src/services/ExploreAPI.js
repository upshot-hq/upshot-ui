import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class ExploreAPI {
  static getExploreContent({
    limit, offset, filter, eventFilter,
  }) {
    return axios.get(
      `${baseUrl}/explore?limit=${limit}&offset=${offset}&filter=${filter}&event=${eventFilter}`,
    );
  }
}

export default ExploreAPI;
