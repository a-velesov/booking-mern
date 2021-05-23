import DashboardNav from '../components/DashboardNav';
import ConnectNav from '../components/ConnectNav';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteHotel, sellerHotels } from '../state/actions/hotel';
import { useSelector } from 'react-redux';
import SmallCard from '../components/cards/SmallCard';
import { toast } from 'react-toastify';

const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [seller, setSeller] = useState([]);

  useEffect(() => {
    loadSellerHotels();
  }, []);

  const loadSellerHotels = async() => {
    let { data } = await sellerHotels(auth.token);
    setSeller(data);
  };

  const handleHotelDelete = async(hotelId) => {
    if (!window.confirm('Are you sure?')) return;
    deleteHotel(auth.token, hotelId)
      .then((res) => {
        toast.success('Hotel Deleted');
        loadSellerHotels();
    })
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
            <h2>Your Hotels</h2>
          </div>

          <div>
            <Link to="/hotels/new" className="btn btn-primary">
              + Add new
            </Link>
          </div>
        </div>

        <div>
          {
            seller.map(s => (
              <SmallCard
                h={s}
                key={s._id}
                owner={true}
                showViewMore={false}
                handleHotelDelete={handleHotelDelete}
              />
            ))
          }
        </div>
      </div>
    </>
  );
};

export default DashboardSeller;