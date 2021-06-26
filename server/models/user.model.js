import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: 'Email is required',
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    activationLink: {
      type: String,
    },
  },
  { timestamps: true });

/**
 * While saving user, we need to make sure the password is hashed, not plain password
 * hashing should be done only in 2 situations
 * 1. if it is the first time a user is being saved/created
 * 2. user have updated/modified the existing password
 * for handling such requirements, we can use 'pre' middleware in our schema
 * this middleware/function will run each time user is saved/created
 * and/or password is modified/updated
 */

userSchema.pre('save', function(next) {
  let user = this;

  if(user.isModified('password')) {
    return bcrypt.hash(user.password, 12,
      (err, hash) => {
        if(err) {
          console.log('BCRYPT HASH ERR', err);
          return next(err);
        }
        user.password = hash;
        return next();
      });
  } else {
    return next();
  }
});

export default mongoose.model('User', userSchema);