import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import axiosApp from './components/Util/axiosApp';
import Statics from './components/Util/Statics';
import PersistedStore from './redux/StateLoader';
import cookie from 'react-cookies';
import { userLogin } from './redux/actions/userLogin';
import { setErrorText } from './redux/actions/setErrorText';

const store = PersistedStore.getDefaultStore().store;
const { dispatch } = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

axiosApp.interceptors.response.use(
  (res) => {
    dispatch({ type: 'DELETE_ERROR' });
    return res.data.data;
  },
  async (err) => {
    console.log('axiosApp.interceptors.response.use(');
    const originalConfig = err.config;
    // Access Token was expired
    try {
      if (err.response.status === 403 && !originalConfig._retry) {
        console.log('Access Token was expired');
        originalConfig._retry = true;
        try {
          const response = await refreshTokenApi();
          cookie.save(Statics.ACCESS_TOKEN, response.accessToken, {
            path: '/',
          });
          cookie.save(Statics.REFRESH_TOKEN, response.refreshToken, {
            path: '/',
          });
          axiosApp.defaults.headers.common['Authorization'] =
            'Bearer ' + response.accessToken;
          return axiosApp(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            userLogOut(1);
            return Promise.reject(_error.response.data);
          }
          userLogOut(2);
          return Promise.reject(_error);
        }
      } else {
        dispatch(setErrorText(err.response.data.error));
        console.log(err.response.data.error);
      }
    } catch (e) {
      dispatch(setErrorText(Statics.ERROR_API_UNREACHABLE));
    }

    return Promise.reject(err);
  }
);

function userLogOut(str) {
  dispatch(userLogin());
}

function getLocalRefreshToken() {
  const refreshToken = cookie.load(Statics.REFRESH_TOKEN);
  return refreshToken;
}

function refreshTokenApi() {
  return axiosApp.post('/token/refresh', {
    refreshToken: getLocalRefreshToken(),
  });
}
