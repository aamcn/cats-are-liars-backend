const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.POOLHOST,
  user: process.env.POOLUSER,
  database: process.env.POOLDB,
  password: process.env.POOLPASSWORD,
  port: process.env.POOLPORT,
});
