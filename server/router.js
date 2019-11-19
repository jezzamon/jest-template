const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

// passport middleware (set session to false since we are using jwt not cookie based session)
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.get("/", requireAuth, function(req, res) {
    res.send({ hi: "there", user: req.user });
  });
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
};
