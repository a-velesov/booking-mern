import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ ...rest }) => {
  const { authReducer } = useSelector((state) => ({ ...state }));
  const { accessToken } = authReducer.data;
  return accessToken ? <Route { ...rest } /> : <Redirect to='/login' />;
};

export default PrivateRoute;