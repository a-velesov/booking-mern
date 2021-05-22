import { useEffect, useState } from 'react';
import { getHotel } from '../state/actions/hotel';
import { format, formatDistance } from 'date-fns';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';

const ViewHotel = ({
  match,
  history,
}) => {
  const [ hotel, setHotel ] = useState({});
  const [ image, setImage ] = useState({});

  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSellerHotel();
  }, []);


  const loadSellerHotel = async() => {
    let res = await getHotel(match.params.hotelId);
    setHotel(res?.data);
    setImage(`${ process.env.REACT_APP_API }/hotel/image/${ res?.data?._id }`);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if(!auth) {
      history.push('/login');
      return;
    }
    modalSuccess();
  };

  const modalSuccess = () => {
    Modal.success({
      content: 'Hotel booked successfully',
    });
  }

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>{ hotel.title }</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img src={ image } alt={ hotel.title } className="img img-fluid m-2" />
          </div>

          <div className="col-md-6">
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
              className="btn btn-lg btn-primary mt-3"
            >
              { auth && auth.token ? 'Book Now' : 'Login to Book' }
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;