require('dotenv').config();

exports.clientConfig = {
  host: process.env.ENV_HOST,
  database: process.env.ENV_DB,
  user: process.env.ENV_USER,
  port: 5432,
  password: process.env.ENV_PASSWORD,
  ssl: { rejectUnauthorized: false }
};
