const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "eric",
    "password": process.env.DB_PASSWORD,
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
  },
  "test": {
    "username": "eric",
    "password": process.env.DB_PASSWORD,
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
  },
  "production": {
    "username": "eric",
    "password": process.env.DB_PASSWORD,
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
  }
}
