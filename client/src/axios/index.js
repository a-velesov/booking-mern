import axios from 'axios';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API
})

$api.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  config.headers.Authorization = `Bearer ${auth.accessToken}`;
  return config;
})


$api.interceptors.response.use((config) => {
  return config;
}, (error) => {
  const originalRequest = error.config;
  console.log(originalRequest, 'origReq');
  if(error?.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
    originalRequest._isRetry = true;
    axios.get(`${process.env.REACT_APP_API}/refresh`, {withCredentials: true})
         .then((res) => {
           localStorage.setItem('auth', JSON.stringify(res.data));
           return $api.request(originalRequest);
         })
      .catch((err) => {
        console.log(err, 'Пользователь не авторизован');
      })
  }
  throw error;
})

export default $api;