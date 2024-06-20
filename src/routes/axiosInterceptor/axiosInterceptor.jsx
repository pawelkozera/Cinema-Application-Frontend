import axios from 'axios';

const axiosInterceptor = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInterceptor.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('JWT'));
  if (token) {
    config.headers['Authorization'] = `Bearer ${token.jwtToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInterceptor.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;

  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshToken = JSON.parse(localStorage.getItem('JWT')).refreshToken;
      const response = await axios.post('http://localhost:8080/api/auth/refreshtoken', {
        refreshToken: refreshToken,
      });

      if (response.status === 200) {
        const newTokenData = response.data;
        localStorage.setItem('JWT', JSON.stringify(newTokenData));
        axiosInterceptor.defaults.headers.common['Authorization'] = `Bearer ${newTokenData.jwtToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newTokenData.jwtToken}`;
        return axiosInterceptor(originalRequest);
      }
    } catch (err) {
      console.error('Error refreshing token:', err);
    }
  }

  return Promise.reject(error);
});

export default axiosInterceptor;
