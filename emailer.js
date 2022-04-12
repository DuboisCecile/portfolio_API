require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  name: process.env.SMTP_HOST,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  // secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
    // tls: {
    //   rejectUnauthorized: false,
    // },
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: true,
  logger: true,
});

// service: 'gmail',
//   auth: {
//     user: "***************@gmail.com",
//     pass: "********",
//   },

module.exports = transporter;
