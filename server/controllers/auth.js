import User from '../models/user';
import jwt from 'jsonwebtoken';

export const register = async(req, res) => {
  const {
          email,
          password,
        } = req.body;

  if(!email) return res.status(400).send('Email is required');
  if(!password || password.length < 6) return res.status(400)
    .send('Password is required and shoild be min 6 characters long');

  let userExist = await User.findOne({ email }).exec();
  if(userExist) return res.status(400).send('Email is taken');

  const user = new User(req.body);
  try {
    await user.save();
    return res.json({
      ok: true,
    });
  } catch(err) {
    console.log('CREATE USER FAILED', err);
    return res.status(400).send('Error. Try again.');
  }
};

export const login = async(req, res) => {
  const {
          email,
          password,
        } = req.body;

  try {
    let user = await User.findOne({ email }).exec();
    if(!user) return res.status(400).send('User with that email not found');
    user.comparePassword(password, (err, match) => {
      // console.log('COMPARE PASSWORD IN LOGIN ERR', err);
      if(!match || err) return res.status(400).send('Wrond password');
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    });
  } catch(err) {
    console.log('LOGIN ERROR', err);
    res.status(400).send('SignIn failed');
  }
};