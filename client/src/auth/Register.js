import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = ({ history }) => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API}/register`, {
      name,
      email,
      password,
    })
      .then(() => {
        toast.success('Register success');
        history.push('/login');
      })
      .catch((err) => {
        if(err.response.status === 400) toast.error(err.response.data);
      });
  };
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Register Page</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            { <RegisterForm
              handleSubmit={ handleSubmit }
              name={ name }
              setName={ setName }
              email={ email }
              setEmail={ setEmail }
              password={ password }
              setPassword={ setPassword }
            /> }
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;