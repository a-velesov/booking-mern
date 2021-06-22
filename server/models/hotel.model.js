import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const hotelSchema = new Schema({
  title: {
    type: String,
    required: 'Title is required',
  },
  content: {
    type: String,
    required: 'Content is required',
    maxLength: 10000,
  },
  location: {
    type: String,
  },
  price: {
    type: Number,
    required: 'Price is required',
    trim: true,
  },
  postedBy: {
    type: ObjectId,
    ref: 'User',
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
  bed: {
    type: Number,
  },
}, { timestamps: true });

export default mongoose.model('Hotel', hotelSchema);