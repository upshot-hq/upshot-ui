import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class WinnerAPI {
    static generateWinner(eventId) {
        return axios.post(`${baseUrl}/events/${eventId}/winners`);
    }

    static getWinner(eventId) {
        return axios.get(`${baseUrl}/events/${eventId}/winners`);
    }
}

export default WinnerAPI;
