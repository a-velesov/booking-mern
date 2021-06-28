import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import { auth } from '../state/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const Login = ({history}) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const dispatch = useDispatch();

  const { authReducer } = useSelector((state) => ({ ...state }));
  const { accessToken } = authReducer.data;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(auth({ email, password }));
  };

  useEffect(() => {
    if (accessToken) history.push('/dashboard');
  }, [accessToken])

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