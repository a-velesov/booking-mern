import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../state/actions/auth';

const TopNav = () => {
  const dispatch = useDispatch();
  const { authReducer } = useSelector((state) => ({ ...state }));
  const { accessToken } = authReducer.data;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/">
        Home
      </Link>

      {
        accessToken && (
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        )
      }
      {
        accessToken && (
          <a className="nav-link pointer"
             onClick={ logoutHandler }
          >
            Logout
          </a>
        )
      }

      {
        !accessToken && (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </>
        )
      }
    </div>
  );
};

export default TopNav;