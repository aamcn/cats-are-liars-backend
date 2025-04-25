require('dotenv').config()
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const usersRouter = require("./routes/usersRouter")
// const catsRouter = require("./routes/catsRouter")
const pool = require("./db/pool");
const { bcrypt, compare } = require('bcryptjs');
const app = express();

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true}));
app.use("/users", usersRouter);
// app.use("/cats", catsRouter);

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = rows[0];
  
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    })
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = rows[0];
  
      done(null, user);
    } catch(err) {
      done(err);
    }
  });

  app.get("/login-success", (req,res) => {
    res.send('Success')
  })
  
  app.get("/login-fail", (req,res) => {
    res.send('fail')
  })
  
  app.get("/in", (req, res) => {
    res.send(req.user)
  });
  
  app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.send("logged out");
    });
  });
  
  app.post(
    "/users/log-in",
    passport.authenticate("local", {
      successRedirect: "/login-success",
      failureRedirect: "/login-fail"
    })
  );

app.listen(3000, () => console.log("app listening on port 3000!"));