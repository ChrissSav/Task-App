import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import axiosApp from './components/Util/axiosApp';
import Statics from './components/Util/Statics';
import { userLogout } from './actions/userLogout';
import PersistedStore from './components/Util/StateLoader';
import cookie from 'react-cookies';
import { userLogin } from './actions/userLogin';

const store = PersistedStore.getDefaultStore().store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

axiosApp.interceptors.response.use(
  (res) => {
    return res.data.data;
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
      }
      if (err.response.status === 403 && err.response.data) {
        userLogOut(3);
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

function userLogOut(str) {
  const { dispatch } = store;
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
