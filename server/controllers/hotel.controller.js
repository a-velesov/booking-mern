import Hotel from '../models/hotel.model';
import fs from 'fs';

export const createHotel = async(req, res, next) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);
    hotel.postedBy = req.user.id;

    if(files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }

    hotel.save((err, result) => {
      if(err) {
        return res.status(400).send('Error saving');
      }
      res.json(result);
    });
  } catch(err) {
    next(err);
  }
};

export const getHotels = async(req, res, next) => {
  try {
    let all = await Hotel.find({})
      .limit(10)
      .select('-image.data')
      .populate('postedBy', '_id name')
      .exec();
    res.json(all);
  } catch(err) {
    next(err);
  }
};

export const image = async(req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();

  if(hotel.image && hotel.image.data !== null) {
    res.set('Content-Type', hotel.image.contentType);
    return res.send(hotel.image.data);
  }
};

export const sellerHotels = async(req, res) => {
  let all = await Hotel.find({ postedBy: req.user.id })
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec();

  res.send(all);
};

export const deleteHotel = async(req, res) => {
  let removed = await Hotel.findByIdAndDelete(req.params.hotelId).exec();
  res.json(removed);
};

export const getHotel = async(req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId)
    .populate('postedBy', '_id name')
    .select('-image.data')
    .exec();
  res.json(hotel);
};

export const updateHotel = async(req, res, next) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    if(files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;

      data.image = image;
    }

    let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, { new: true });
    res.json(updated);

  } catch(err) {
    next(err);
  }
};