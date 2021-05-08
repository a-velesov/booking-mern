import User from '../models/user';

export const register = async(req, res) => {
  const {
          email,
          password,
        } = req.body;

  if(!email) return res.status(400).send('Email is required');
  if(!password || password.length < 6) return res.status(400)
    .send('Password is required and shoild be min 6 characters long');

  const userExist = await User.findOne({ email }).exec();
  if(userExist) return res.status(400).send('Email is taken');

  const user = new User(req.body);
  try {
    await user.save();
    return res.json({
      ok: true,
    });
  } catch(err) {
    console.log("CREATE USER FAILED", err);
    return res.status(400).send("Error. Try again.");
  }
};