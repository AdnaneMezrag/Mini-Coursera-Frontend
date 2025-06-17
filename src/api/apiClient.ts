import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7124/api', // Replace with your API URL
});

export default apiClient;