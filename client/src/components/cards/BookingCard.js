import { currencyFormatter } from '../../use';

const BookingCard = ({ hotel }) => {

  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {
              hotel.image && hotel.image.contentType
                ? (
                  <img
                    src={ `${ process.env.REACT_APP_API }/hotel/image/${ hotel._id }` }
                    alt="hotel image"
                    className="card-image w-100 img img-fluid"
                  />
                )
                : (
                  <img
                    src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                    alt="hotel image default"
                    className="card-image img img-fluid"
                  />
                )
            }
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                { hotel.title }
                <span className="float-right text-primary">
                  { currencyFormatter({
                    amount: hotel.price,
                    currency: 'usd',
                  }) }
                </span>
              </h3>
              <p className="alert alert-info">{ hotel.location }</p>
              <p className="card-text">{ `${ hotel.content }...` }</p>
              <p className="card-text">{ hotel.bed } bed</p>
              <p className="card-text">
                Available from { new Date(hotel.from).toLocaleDateString() }
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;