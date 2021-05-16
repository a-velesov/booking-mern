import Hotel from '../models/hotel';
import fs from 'fs';

export const create = async(req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);
    hotel.postedBy = req.user._id;

    if(files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }

    hotel.save((err, result) => {
      if(err) {
        console.log('saving hotel err', err);
        res.status(400).send('Error saving');
      }
      res.json(result);
    });
  } catch(err) {
    res.status(400).json({
      err: err.message,
    });
  }
};

export const hotels = async(req, res) => {
  try {
    let all = await Hotel.find({})
      .limit(10)
      .select('-image.data')
      .populate('postedBy', '_id name')
      .exec();
    res.json(all);
  } catch(err) {
    res.status(400).json({
      err: err.message,
    });
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
  let all = await Hotel.find({ postedBy: req.user._id })
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec();

  res.send(all);
};

export const remove = async(req, res) => {
  let removed = await Hotel.findByIdAndDelete(req.params.hotelId).exec();
  res.json(removed);
};