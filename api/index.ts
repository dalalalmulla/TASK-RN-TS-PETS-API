import axios from 'axios';

const waiter = axios.create({
  baseURL: 'https://pets-react-query-backend.eapi.joincoded.com',
});

export default waiter;