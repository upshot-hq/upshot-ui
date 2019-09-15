import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class SearchAPI {
  static search({ scope, searchQuery, strict }) {
    const strictString = (strict) ? 'true' : 'false';
    return axios.get(`${baseUrl}/search?s=${scope}&q=${searchQuery}&strict=${strictString}`);
  }
}

export default SearchAPI;
