const passport = require('passport');
const User = require('../models/user');
const config = require('../config');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// set up options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if user id in payload exists in db
  // if so call done with that user object
  // otherwise call done without user object
  User.findById(payload.sub, function(err, user) {
    if (err) return done(err, false);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});
// Tell passport to use this strategy
passport.use(jwtLogin);
