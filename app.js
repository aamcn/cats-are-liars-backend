require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const usersRouter = require("./routes/usersRouter");
const catsRouter = require("./routes/catsRouter");
const feedHistoryRouter = require("./routes/feedHistoryRouter");
const { jwtCheck } = require("./verify/jwtCheck");

const app = express();

// app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(passport.authenticate("session"));
app.use(cookieParser());
// app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// enforce on all endpoints
// app.use(jwtCheck);


app.use("/users", jwtCheck, usersRouter);
app.use("/cats", jwtCheck, catsRouter);
app.use("/feed-history", jwtCheck, feedHistoryRouter);


app.get("/api/public", function (req, res) {
  res.json({
    message: "hello from the public api",
  });
});

app.get("/api/private", jwtCheck, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});


app.listen(3000, () => console.log("app listening on port 3000!"));

