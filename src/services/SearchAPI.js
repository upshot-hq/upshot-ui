import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class SearchAPI {
  static search({ scope, searchQuery }) {
    return axios.get(`${baseUrl}/search?s=${scope}&q=${searchQuery}`);
  }
}

export default SearchAPI;
