import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { login } from '../state/actions/auth';
import { toast } from 'react-toastify';

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await login({
        email,
        password,
      });
      if (res.data) {
        console.log(res.data);
      }
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