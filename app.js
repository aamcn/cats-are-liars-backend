require("dotenv").config();
const jwt = require('jsonwebtoken');
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const usersRouter = require("./routes/usersRouter");
const catsRouter = require("./routes/catsRouter");
const feedHistoryRouter = require("./routes/feedHistoryRouter");
const pool = require("./db/pool");
const { bcrypt, compare } = require("bcryptjs")
const verifyToken = require("./verifyToken")
const app = express();

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use("/users", usersRouter);
app.use("/cats", catsRouter);
app.use("/feed-history", feedHistoryRouter);


//Finds username in the 'users' table and checks if the entered username and password match. 
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
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
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



app.post('/posts', verifyToken.verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) =>{
    if(err) {
      res.sendStatus(403)
    } else {
    res.json({
    message: 'Hiya...',
    authData
  })
    }
  })
})

/* 
When user click enter on the log in form the entered password and username are authenticated using passport. 
depending on succesful or unsuccesful log in the browser redirects to the assigned url. 
*/
app.post("/users/log-in",
  passport.authenticate("local", {
    successRedirect: "/login-success",
    failureRedirect: "/login-fail",
  }),
);

/* 
When a log in is succesful, a unique 'json web token' is created and returned to the browser to be stored and used for
 verifying database queries. 
 */
app.get("/login-success", (req, res) => {
  const user = req.user
  // json web tokens currently expire after 30 minutes and the user must log in again to receive a new token to make database queries.
  jwt.sign({user: user}, 'secretkey', {expiresIn: '30m'}, (err,token) => {
    res.json({
      token
    })
  })
});


app.get("/login-fail", (req, res) => {
  res.send("fail");
});


app.listen(3000, () => console.log("app listening on port 3000!"));
