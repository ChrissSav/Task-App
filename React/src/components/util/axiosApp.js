import axios from 'axios';
import cookie from 'react-cookies';
import { setErrorTextAction } from '../../redux/actions/setErrorText';
import { userLogout } from '../../redux/actions/userLogout';
import PersistedStore from '../../redux/StateLoader';
import Statics from './Statics';

const store = PersistedStore.getDefaultStore().store;
const { dispatch } = store;

function getLocalAccessToken() {
  const accessToken = cookie.load(Statics.ACCESS_TOKEN);
  return accessToken;
}

function userLogOut(str) {
  dispatch(userLogout());
}

function getLocalRefreshToken() {
  const refreshToken = cookie.load(Statics.REFRESH_TOKEN);
  return refreshToken;
}

function refreshTokenApi() {
  return axiosApp.post('/auth/token-refresh', {
    refreshToken: getLocalRefreshToken(),
  });
}

const axiosApp = axios.create({
  baseURL: Statics.API_URL,
  timeout: 2500,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApp.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      //console.log('Add Access Token to Header');
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    //console.log(config);
    dispatch(setErrorTextAction(''));
    return config;
  },
  (error) => {
    console.log('axiosApp.interceptors.request config  error');
    return Promise.reject(error);
  }
);

axiosApp.interceptors.response.use(
  (res) => {
    return res.data.data;
  },
  async (err) => {
    // console.log('axiosApp.interceptors.response.use(');
    const originalConfig = err.config;
    // Access Token was expired
    console.log(originalConfig.url);
    try {
      if (
        err.response.status === 403 &&
        !originalConfig._retry &&
        !originalConfig.url.includes('login') &&
        !originalConfig.url.includes('register') &&
        !originalConfig.url.includes('token')
      ) {
        console.log('Access Token was expired');
        originalConfig._retry = true;
        try {
          const response = await refreshTokenApi();
          Statics.saveAccessRefreshToken(response.accessToken, response.refreshToken);
          axiosApp.defaults.headers.common['Authorization'] = 'Bearer ' + response.accessToken;
          return axiosApp(originalConfig);
        } catch (_error) {
          console.log(_error);
          if (_error.response && _error.response.data) {
            userLogOut(1);
            return Promise.reject(_error.response.data);
          }
          userLogOut(2);
          return Promise.reject(_error);
        }
      } else {
        dispatch(setErrorTextAction(err.response.data.error));
        // console.log(err.response.data.error);
      }
    } catch (e) {
      dispatch(setErrorTextAction(Statics.ERROR_API_UNREACHABLE));
    }

    return Promise.reject(err);
  }
);

export default axiosApp;
