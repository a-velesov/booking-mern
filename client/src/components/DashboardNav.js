import { NavLink } from 'react-router-dom';

const DashboardNav = () => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink
          exact
          className={'nav-link'}
          to='/dashboard'
          activeclassname="active"
        >
          Your Bookings</NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={'nav-link'}
          to='/dashboard/seller'
          activeclassname="active"
        >
          Your Hotels</NavLink>
      </li>
    </ul>
  );
};

export default DashboardNav;