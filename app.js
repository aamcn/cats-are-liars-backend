require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const pool = require("./db/pool");
const { bcrypt, compare } = require("bcryptjs");
const verifyToken = require("./verifyToken");

const usersRouter = require("./routes/usersRouter");
const catsRouter = require("./routes/catsRouter");
const feedHistoryRouter = require("./routes/feedHistoryRouter");
const app = express();

app.use(cors());

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  }),
);
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.authenticate("session"));

app.use(cookieParser());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use("/users", usersRouter);
app.use("/cats", catsRouter);
app.use("/feed-history", feedHistoryRouter);

/*
Finds username in the 'users' table and checks if the user submitted username and password match the stored 
username and password. 
*/
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      const user = rows[0];
      // If no user is found, error message is returned
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      //If user is found, the entered password is hashed and compared to the stored password.
      const match = await compare(password, user.password);
      console.log(match);
      //If they do not match a password error is returned.
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      //If username and password match the log in is succesful and the user object is returned.

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// Takes a callback containing information to be stored in session data.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/* 
Is called when retrieving a session, to extract serialized data to attach something to the .user property of req.user
to be used in the rest of the request.
*/
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = ($1)", [
      id,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Logs user out from the current session.
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send("logged out");
  });
});

/* 
When user click enter on the log in form the entered password and username are authenticated using passport. 
depending on succesful or unsuccesful log in the browser redirects to the assigned url. 
*/
app.post(
  "/log-in",
  passport.authenticate("local", {
    failureRedirect: "/login-fail",
    failureMessage: true,
  }),
  function (req, res) {
    const user = req.user;
    const userId = req.user.id;
    const username = req.user.username;
    const role = req.user.role;
    const householdId = req.user.household_id;
    // json web tokens currently expire after 30 minutes and the user must log in again to receive a new token to make database queries.
    jwt.sign({ user }, "secretkey", { expiresIn: "30m" }, (err, token) => {
      res.json({
        token,
        userId,
        username,
        role,
        householdId,
      });
    });
  },
);

// Returns log in fail message.
app.get("/login-fail", (req, res) => {
  res.send("fail");
});

app.listen(3000, () => console.log("app listening on port 3000!"));
