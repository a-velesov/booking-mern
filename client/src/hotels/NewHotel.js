import { useState } from 'react';
import HotelCreateForm from '../components/forms/HotelCreateForm';

const NewHotel = () => {

  const [ preview, setPreview ] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW');

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelCreateForm
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

export default NewHotel;