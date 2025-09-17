require("dotenv").config();
const express = require("express");
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const usersRouter = require("./routes/usersRouter");
const catsRouter = require("./routes/catsRouter");
const feedHistoryRouter = require("./routes/feedHistoryRouter");

const app = express();

// app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(passport.authenticate("session"));
app.use(cookieParser());
// app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", usersRouter);
app.use("/cats", catsRouter);
app.use("/feed-history", feedHistoryRouter);

const jwtCheck = auth({
  audience: "http://localhost:3000/",
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

// enforce on all endpoints
// app.use(jwtCheck);

app.get("/api/public", function (req, res) {
  res.json({
    message: "hello from the public api",
  });
});



app.listen(3000, () => console.log("app listening on port 3000!"));

