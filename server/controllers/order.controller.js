import User from '../models/user.model';
import Order from '../models/order.model';

export const userHotelBookings = async(req, res) => {
  const order = await Order.find({ orderedBy: req.user._id })
    .populate('hotel', '-image.data')
    .populate('orderedBy', '_id name')
    .exec();

  res.json(order);
};

export const bookingSuccess = async(req, res) => {
  try {
    const { hotelId } = req.body;

    const user = await User.findById(req.user._id).exec();
    // console.log("USER ==> ", user);

    const session = {};

    let newOrder = new Order({
      hotel: hotelId,
      session,
      orderedBy: user._id,
    });
    newOrder.save((err, result) => {
      if(err) {
        console.log('booking hotel err', err);
        res.status(400).send('Error booking');
      }
      res.json(result);
    });
  } catch(err) {
    res.status(400).json({
      err: err.message,
    });
  }
};

export const isAlreadyBooked = async(req, res) => {
  const { hotelId } = req.params;
  const userOrders = await Order.find({ orderedBy: req.user._id })
    .select('hotel')
    .exec();

  let ids = [];
  for(let i = 0; i < userOrders.length; i++) {
    ids.push(userOrders[i].hotel.toString());
  }

  res.json({
    ok: ids.includes(hotelId),
  });
};