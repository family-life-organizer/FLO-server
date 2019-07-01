require("dotenv").config();

module.exports = {
  development: {
      url: process.env.DATABASE_URL,
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "family_organize",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres"
  }
};
