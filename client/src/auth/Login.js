import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { login } from '../state/actions/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const Login = ({history}) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await login({
        email,
        password,
      });

      if(res.data) {
        window.localStorage.setItem('auth', JSON.stringify(res.data));
        dispatch({
          type: 'LOGIN',
          payload: res.data,
        })
      }
      history.push('/dashboard');
    } catch(err) {
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Login</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={ handleSubmit }
              email={ email }
              setEmail={ setEmail }
              password={ password }
              setPassword={ setPassword }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;