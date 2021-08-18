import axios from 'axios';
import cookie from 'react-cookies';
import Statics from './Statics';

function getLocalAccessToken() {
  const accessToken = cookie.load(Statics.ACCESS_TOKEN);
  return accessToken;
}

const axiosApp = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApp.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      console.log('Add Access Token to Header');
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    //console.log(config);
    return config;
  },
  (error) => {
    console.log('axiosApp.interceptors.request config  error');
    return Promise.reject(error);
  }
);

export default axiosApp;
