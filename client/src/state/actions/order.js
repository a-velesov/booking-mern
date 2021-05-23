import axios from 'axios';

export const orderSuccess = async (token, hotelId) => {
  return await axios.post(`${ process.env.REACT_APP_API }/booking-success`, hotelId, {
    headers: {
      Authorization: `Bearer ${ token }`,
    },
  });
}
export const userHotelBookings = async (token) => {
  return await axios.get(`${ process.env.REACT_APP_API }/user-hotel-bookings`, {
    headers: {
      Authorization: `Bearer ${ token }`,
    },
  });
}