import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3333',
  baseURL: 'http://10.0.2.2:3000',
});

export default api;

// ios baseURL: 'http://localhost:3333'
// android baseURL: 'http://10.0.2.2:3000'
