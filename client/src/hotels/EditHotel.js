import { useEffect, useState } from 'react';
import { getHotel } from '../state/actions/hotel';
import HotelCreateForm from '../components/forms/HotelCreateForm';

const EditHotel = ({ match }) => {
  const [ dataValue, setDataValue ] = useState({});
  const [ preview, setPreview ] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW');

  useEffect(() => {
    loadHotel();
  }, []);

  const loadHotel = async() => {
    let res = await getHotel(match.params.hotelId);
    setDataValue(res?.data);
    setPreview(`${process.env.REACT_APP_API}/hotel/image/${res?.data?._id}`);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Edit Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <HotelCreateForm
              dataValue={ dataValue }
              setPreview={ setPreview }
            />
          </div>
          <div className="col-md-2">
            <img src={ preview }
                 alt="preview_image"
                 className="img img-fluid m-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHotel;