const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // at this point user already has their sign in Auth'd with passport middleware
  // we just need to give them a token
  res.json({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  // see if a given user exist
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
  });

  // if not create user with User SChema
  const user = new User({
    email: email,
    password: password,
  });

  // save new user in db
  user.save(function(err) {
    if (err) return next(err);

    // response to request
    res.json({ token: tokenForUser(user) });
  });
};
