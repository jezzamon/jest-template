const passport = require('passport');
const User = require('../models/user');
const config = require('../config');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create Local Strategy
const localOptions = { userName: 'email' };
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  // verify email and pwd is correct
  User.findOne({ email: email }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);

    // compare passwords - comparePassword is the customMethod we created in user model
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if (!isMatch) return done(null, false);

      // done callback adds user to req (req.user)
      return done(null, user);
    });
  });
});
// set up options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// create jwt strategy
// this strategy takes the options which contain the jwt string, and the secret,
// the strategy decodes jwt - returns the information inside (payload)
// in this case the payload is sub (subject) and iat (timestamp)
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
passport.use(localLogin);
