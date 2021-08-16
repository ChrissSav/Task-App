import axios from 'axios';
import cookie from 'react-cookies';
import Statics from './Statics';

function getLocalAccessToken() {
  const accessToken = cookie.load(Statics.ACCESS_TOKEN);
  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken = cookie.load(Statics.REFRESH_TOKEN);
  return refreshToken;
}

const axiosApp = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

function refreshTokenApi() {
  return axiosApp.post('/token/refresh', {
    refreshToken: getLocalRefreshToken(),
  });
}

axiosApp.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      console.log('Add Access Token to Header');
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    console.log(config);
    return config;
  },
  (error) => {
    console.log('axiosApp.interceptors.request config  error');
    return Promise.reject(error);
  }
);

axiosApp.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    console.log('axiosApp.interceptors.response.use(');

    const originalConfig = err.config;
    if (
      err.response &&
      err.config.url !== 'login' &&
      err.config.url !== 'register'
    ) {
      // Access Token was expired
      console.log('Access Token was expired');
      if (err.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await refreshTokenApi();
          console.log(rs.data);
          const { data } = rs.data;
          cookie.save(Statics.ACCESS_TOKEN, data.accessToken, { path: '/' });
          cookie.save(Statics.REFRESH_TOKEN, data.refreshToken, { path: '/' });
          axiosApp.defaults.headers.common['Authorization'] =
            'Bearer ' + data.accessToken;
          return axiosApp(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            cookie.remove(Statics.REFRESH_TOKEN);
            cookie.remove(Statics.ACCESS_TOKEN);
            return Promise.reject(_error.response.data);
          }
          cookie.remove(Statics.REFRESH_TOKEN);
          cookie.remove(Statics.ACCESS_TOKEN);
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        cookie.remove(Statics.REFRESH_TOKEN);
        cookie.remove(Statics.ACCESS_TOKEN);
        return Promise.reject(err.response.data);
      }
    }
    cookie.remove(Statics.REFRESH_TOKEN);
    cookie.remove(Statics.ACCESS_TOKEN);
    return Promise.reject(err);
  }
);

export default axiosApp;
