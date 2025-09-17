const { auth } = require("express-oauth2-jwt-bearer");


const jwtCheck = auth({
  audience: "http://localhost:3000/",
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

module.exports = { jwtCheck };