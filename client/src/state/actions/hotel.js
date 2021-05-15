import axios from 'axios';

export const createHotel = async(token, data) => {
  return await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
    headers: {
      Authorization: `Bearer ${ token }`,
    },
  });
};

export const allHotels = async() => {
  return await axios.get(`${process.env.REACT_APP_API}/hotels`);
};

export const sellerHotels = async(token) => {
  return await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
    headers: {
      Authorization: `Bearer ${ token }`,
    }
  })
};