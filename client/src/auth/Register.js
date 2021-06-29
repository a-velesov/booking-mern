import { useEffect, useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { register } from '../state/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const Register = ({ history }) => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const dispatch = useDispatch();
  const { authReducer } = useSelector((state) => ({ ...state }));
  const { accessToken } = authReducer.data;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({
      name,
      email,
      password,
    }));
  };

  useEffect(() => {
    if (accessToken) history.push('/dashboard');
  }, [accessToken])

  return (
    <>
      <div className="container-fluid bg-dark p-5 text-center">
        <h1>Registration</h1>
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