require('dotenv').config();

function getEnv(variable) {
  const value = process.env[variable];
  if (typeof value === 'undefined') {
    console.warn(`Seems like the variable "${variable}" is not set in the environment. 
    Did you forget to execute "cp .env.sample .env" and adjust variables in the .env file to match your own environment ?`);
  }
  return value;
}

const PORT = getEnv(`PORT`);
const CORS_ALLOWED_ORIGINS = getEnv(`CORS_ALLOWED_ORIGINS`);

const API_KEY = getEnv('SMTP_USER');
const SECRET_KEY = getEnv('SMTP_PASSWORD');

module.exports = {
  getEnv,
  PORT,
  CORS_ALLOWED_ORIGINS,
  API_KEY,
  SECRET_KEY,
};
