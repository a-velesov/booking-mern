import $api from '../../axios';
import { toast } from 'react-toastify';
import axios from 'axios';

export const loginSuccess = (user) => ({
    type: 'LOGIN',
    payload: user,
    error: null,
  }
);

export const logoutSuccess = () => ({
    type: 'LOGOUT',
    error: null,
  }
);

export const authFail = (error) => ({
    type: 'AUTH_FAIL',
    error,
  }
);
export const loading = (loading) => ({
    type: 'LOADING',
    loading,
  }
);

export const auth = (userData) => (dispatch) => {
  dispatch(loading(true));
  axios.post(`${ process.env.REACT_APP_API }/login`, userData, { withCredentials: true })
       .then((res => {
         localStorage.setItem('auth', JSON.stringify(res.data));
         dispatch(loginSuccess(res.data));
         toast.success('Login success');
       }))
       .catch((err) => {
         localStorage.clear();
         dispatch(authFail(err.message));
         toast.error(err.message);
       })
       .finally(() => dispatch(loading(false)));
};
export const logout = () => (dispatch) => {
  dispatch(loading(true));
  $api.post('/logout')
      .then(() => {
        localStorage.clear();
        dispatch(logoutSuccess());
        toast.success('Logout success');
      })
      .catch((err) => {
        dispatch(authFail(err.message));
      })
      .finally(() => dispatch(loading(false)));
};

export const checkAuth = () => (dispatch) => {
  dispatch(loading(true));
  $api.get('/refresh')
      .then((res) => {
        localStorage.setItem('auth', JSON.stringify(res.data));
        dispatch(loginSuccess(res.data));
      })
      .catch((err) => {
        localStorage.clear();
        dispatch(authFail(err.message));
      })
      .finally(() => dispatch(loading(false)));
};

export const register = (userData) => (dispatch) => {
  dispatch(loading(true));
  axios.post(`${ process.env.REACT_APP_API }/register`, userData, { withCredentials: true })
       .then((res => {
         localStorage.setItem('auth', JSON.stringify(res.data));
         dispatch(loginSuccess(res.data));
         toast.success(`Register success. The activation link was sent to the email ${ res.data.user.email }`);
       }))
       .catch((err) => {
         const valitateError = err.response.data.message.email || err.response.data.message.password || err.response.data.message;
         dispatch(authFail(valitateError));
         toast.error(valitateError);
       })
       .finally(() => dispatch(loading(false)));
};