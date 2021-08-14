import axios from 'axios';

function getLocalAccessToken() {
  const accessToken = window.localStorage.getItem('accessToken');
  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken = window.localStorage.getItem('refreshToken');
  return refreshToken;
}

const axiosApp = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

function refreshToken() {
  return axiosApp.post('/auth/refreshtoken', {
    refreshToken: getLocalRefreshToken(),
  });
}

axiosApp.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      console.log('axiosApp.interceptors.request config');

      config.headers['x-access-token'] = token;
    }
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
    const originalConfig = err.config;
    if (err.response && err.config.url != 'login') {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await refreshToken();
          const { accessToken } = rs.data;
          window.localStorage.setItem('accessToken', accessToken);
          axiosApp.defaults.headers.common['x-access-token'] = accessToken;
          return axiosApp(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export default axiosApp;
