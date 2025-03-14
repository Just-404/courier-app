const { Router } = require("express");
const passport = require("../auth");
const loginRouter = Router();

loginRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ error: info.message });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      user.password = undefined;
      return res.json({ msg: "Login successful", user });
    });
  })(req, res, next);
});

loginRouter.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = loginRouter;
