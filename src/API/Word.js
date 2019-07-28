import axios from 'axios';

export default axios.create({
    baseURL: 'https://random-word-api.herokuapp.com/'
})