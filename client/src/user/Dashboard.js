import DashboardNav from '../components/DashboardNav';
import ConnectNav from '../components/ConnectNav';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { userHotelBookings } from '../state/actions/order';
import BookingCard from '../components/cards/BookingCard';

const Dashboard = () => {

  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [ booking, setBooking ] = useState([]);

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async() => {
    const res = await userHotelBookings(token);
    setBooking(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-11">
            <h2>Your Bookings</h2>
          </div>
          <div>
            <Link to="/" className="btn btn-primary">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>
      <div className="column">
        {
          booking.map((b) => (
            <BookingCard
              hotel={ b.hotel }
              key={ b._id }
            />
          ))
        }
      </div>
    </>
  );
};

export default Dashboard;