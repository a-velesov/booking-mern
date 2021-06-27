import $api from '../../axios';

export const orderSuccess = async (hotelId) => {
  return await $api.post(`/booking-success`, hotelId);
}

export const userHotelBookings = async () => {
  return await $api.get(`/user-hotel-bookings`);
}

export const isAlreadyBooked = async (hotelId) => {
  return await $api.get(`/is-already-booked/${hotelId}`);
}