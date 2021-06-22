import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    hotel: {
      type: ObjectId,
      required: 'Not found hotelId',
      ref: 'Hotel',
    },
    session: {
      type: Object
    },
    orderedBy: {
      type: ObjectId,
      required: 'Not found user',
      ref: 'User',
    },
  },
  { timestamps: true });

export default mongoose.model('Order', orderSchema);