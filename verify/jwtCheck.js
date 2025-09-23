const { auth } = require("express-oauth2-jwt-bearer");

// Middleware to check the JWT received in the Authorization header.
const jwtCheck = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});

module.exports = { jwtCheck };
