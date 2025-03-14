const express = require("express");
const session = require("express-session");
const path = require("path");

const passport = require("./auth");
const userAuth = require("./controllers/authController");

const loginRouter = require("./routes/loginRouter");
const signUpRouter = require("./routes/signUpRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pgSession = require("connect-pg-simple")(session);

app.use(
  session({
    store: new pgSession({
      conString: process.env.DATABASE_URL,
      tableName: "Session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // One hour
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connecting the React dist
const ReactRoute = path.join(__dirname, "../../pacas-app-ui/dist");
app.use(express.static(ReactRoute));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;

  next();
});

/// Routes

app.use("", loginRouter);
app.use("", signUpRouter);
app.use("/api", authRouter);
app.use("/:role/:user", userAuth.isAuth, userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(ReactRoute, "index.html"));
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    msg: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("There's been an error");
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
