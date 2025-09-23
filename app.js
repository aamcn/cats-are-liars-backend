require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const nocache = require("nocache");
const cors = require("cors");
const usersRouter = require("./routes/usersRouter");
const catsRouter = require("./routes/catsRouter");
const feedHistoryRouter = require("./routes/feedHistoryRouter");
const  messagesRouter = require("./routes/messagesRouter");
const { jwtCheck } = require("./verify/jwtCheck");


if (!process.env.CLIENT_ORIGIN_URL) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const app = express();  
const apiRouter = express.Router();
  
app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'none'"],
        "frame-ancestors": ["'none'"],
      },
    },
    frameguard: {
      action: "deny",
    },
  })
);

app.use((req, res, next) => {
  res.contentType("application/json; charset=utf-8");
  next();
}); 
app.use(nocache()); 
 

app.use(
  cors()
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// enforce on all endpoints
// app.use(jwtCheck);

//Routes are chained with jwtCheck middleware to enforce authentication.
app.use("/users", jwtCheck, usersRouter);
app.use("/cats", jwtCheck, catsRouter);
app.use("/feed-history", jwtCheck, feedHistoryRouter);
app.use("/api", apiRouter);
apiRouter.use("/messages", messagesRouter);


 
app.listen(3000, () => console.log("app listening on port 3000!"));
