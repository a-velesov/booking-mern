import $api from '../../axios';
import { toast } from 'react-toastify';
import axios from 'axios';

export const loginSuccess = (user) => ({
    type: 'LOGIN',
    payload: user,
    error: null
  }
);

export const logoutSuccess = () => ({
    type: 'LOGOUT',
    error: null
  }
);

export const authFail = (error) => ({
    type: 'AUTH_FAIL',
    error,
  }
);

export const auth = (userData) => (dispatch) => {
  axios.post(`${process.env.REACT_APP_API}/login`, userData, {withCredentials: true})
      .then((res => {
        localStorage.setItem('auth', JSON.stringify(res.data));
        dispatch(loginSuccess(res.data));
        toast.success('Login success');
      }))
      .catch((err) => {
        localStorage.clear();
        dispatch(authFail(err.message));
        toast.error(err.message);
      });
};
export const logout = () => (dispatch) => {
  $api.post('/logout')
      .then(() => {
        localStorage.clear();
        dispatch(logoutSuccess());
        toast.success('Logout success');
      })
      .catch((err) => {
        dispatch(authFail(err.message));
      });
};

export const checkAuth = () => (dispatch) => {
  $api.get('/refresh')
    .then((res) => {
      localStorage.setItem('auth', JSON.stringify(res.data));
      dispatch(loginSuccess(res.data));
    })
    .catch((err) => {
      localStorage.clear();
      dispatch(authFail(err.message));
    })
}

export const register = (userData) => (dispatch) => {
  axios.post(`${process.env.REACT_APP_API}/register`, userData, {withCredentials: true})
      .then((res => {
        localStorage.setItem('auth', JSON.stringify(res.data));
        dispatch(loginSuccess(res.data));
        toast.success(`Register success. The activation link was sent to the email ${res.data.user.email}`);
      }))
      .catch((err) => {
        const valitateError = err.response.data.message.email || err.response.data.message.password || err.response.data.message;
        dispatch(authFail(valitateError));
        toast.error(valitateError);
      });
};