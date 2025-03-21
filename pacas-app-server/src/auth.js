const userService = require("./services/UserService");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
require("dotenv").config();

const customFields = {
  usernameField: "name",
  passwordField: "password",
};
passport.use(
  new LocalStrategy(customFields, async (name, password, done) => {
    try {
      const user = await userService.getUserByName(name);
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await userService.getUserById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
