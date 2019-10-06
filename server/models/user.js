const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// on save hook encrypt password
userSchema.pre('save', function(next) {
  // get access to instance of User
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash pwd with salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);

      // overwrite password with hashed paswword
      user.password = hash;
      next();
    });
  });
});

// we create our own methods to add on user instance
// using bcrypt to unhash, will compare password candidatePassword and stored pwd
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      cb(err);
    }

    cb(null, isMatch);
  });
};
// Create model class
const ModelClass = mongoose.model('user', userSchema);

// Export model
module.exports = ModelClass;
