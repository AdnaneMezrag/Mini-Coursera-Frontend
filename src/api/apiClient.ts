import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://mini-coursera-backend.onrender.com/api', // Replace with your API URL
});

export default apiClient;