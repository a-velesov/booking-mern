import $api from '../../axios';

export const createHotel = async(data) => {
  return await $api.post(`/create-hotel`, data);
};

export const allHotels = async() => {
  return await $api.get(`/hotels`);
};

export const sellerHotels = async() => {
  return await $api.get(`/seller-hotels`);
};

export const deleteHotel = async(hotelId) => {
  return await $api.delete(`/delete-hotel/${ hotelId }`);
};

export const getHotel = async(hotelId) => {
  return await $api.get(`/hotel/${ hotelId }`);
};

export const updateHotel = async(data, hotelId) => {
  return await $api.put(`/update-hotel/${ hotelId }`, data);
};

