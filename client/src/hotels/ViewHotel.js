import { useEffect, useState } from 'react';
import { getHotel } from '../state/actions/hotel';
import { format, formatDistance } from 'date-fns';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { isAlreadyBooked, orderSuccess } from '../state/actions/order';

const ViewHotel = ({
  match,
  history,
}) => {
  const [ hotel, setHotel ] = useState({});
  const [ image, setImage ] = useState({});
  const [ alreadyBooked, setAlreadyBooked ] = useState(false);

  const { authReducer } = useSelector((state) => ({ ...state }));
  const { accessToken } = authReducer.data;

  useEffect(() => {
    loadSellerHotel();
  }, []);

  useEffect(() => {
    if(accessToken) {
      isAlreadyBooked(match.params.hotelId)
        .then(res => {
          if(res.data.ok) setAlreadyBooked(true);
        });
    }
  }, []);

  const loadSellerHotel = async() => {
    let res = await getHotel(match.params.hotelId);
    setHotel(res?.data);
    setImage(`${ process.env.REACT_APP_API }/hotel/image/${ res?.data?._id }`);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if(!accessToken) {
      history.push('/login');
      return;
    }

    bookingSuccessHandler();
  };

  const bookingSuccessHandler = () => {
    orderSuccess({ hotelId: match.params.hotelId })
      .then(() => {
        Modal.success({
          content: 'Hotel booked successfully',
        });
      }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>{ hotel.title }</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <br />
            <img src={ image } alt={ hotel.title } className="img img-fluid m-2 w-100" />
          </div>

          <div className="col-md-8">
            <br />
            <b>{ hotel.content }</b>
            <p className="alert alert-info mt-3">${ hotel.price }</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for { hotel.from && hotel.to && formatDistance(new Date(hotel.from), new Date(hotel.to)) }
              </span>
            </p>
            <p>
              From <br />{ ' ' }
              { hotel.from && format(new Date(hotel.from), 'yyyy-MM-dd') }
            </p>
            <p>
              To <br />{ ' ' }
              { hotel.to && format(new Date(hotel.to), 'yyyy-MM-dd') }
            </p>
            <i>Posted by { hotel.postedBy && hotel.postedBy.name }</i>
            <br />
            <button
              onClick={ handleClick }
              disabled={ alreadyBooked }
              className="btn btn-lg btn-primary mt-3"
            >
              {
                alreadyBooked
                  ? 'Already Booked'
                  : accessToken
                  ? 'Book Now'
                  : 'Login to Book'
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;