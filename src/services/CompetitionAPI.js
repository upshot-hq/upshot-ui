import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class CompetitionAPI {
  static getCompetitions() {
    return axios.get(`${baseUrl}/competitions`);
  }
}

export default CompetitionAPI;
