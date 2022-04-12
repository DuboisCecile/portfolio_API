const nodeMailjet = require('node-mailjet');
const express = require('express');

const cors = require('cors');
const {
  PORT,
  CORS_ALLOWED_ORIGINS,
  inTestEnv,
  API_KEY,
  SECRET_KEY,
} = require('./env');
// const emailer = require('./emailer');

const app = express();
app.use(express.json());

/* ********************** app settings ********************** */
app.set('x-powered-by', false); // for security

const allowedOrigins = CORS_ALLOWED_ORIGINS.split(',');
const corsOptions = {
  origin: (origin, callback) => {
    if (origin === undefined || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.post('/contactmail', (req, res) => {
  const { email, message, userName } = req.body;
  const mailjet = nodeMailjet.connect(API_KEY, SECRET_KEY);
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'contact@duboiscecile.fr',
          Name: userName,
        },
        To: [
          {
            Email: 'duboiscecilepro@gmail.com',
            Name: 'Cécile Dubois',
          },
        ],
        Subject: 'Demande de contact',
        TextPart: 'Demande de contact',
        HTMLPart: `<h3>Nouveau message de la part de ${userName}</h3>
                   <p>Adresse email : ${email}</p>
                   <h4>Message : ${message}</h4>`,
        CustomID: 'AppGettingStartedTest',
      },
    ],
  });

  request
    .then((result) => {
      console.log(result.body);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err.statusCode);
      res.sendStatus(500);
    });

  // emailer.sendMail(
  //   {
  //     from: email,
  //     to: 'duboiscecilepro@gmail.com',
  //     subject: 'Contact Form Submission',
  //     html: `<p>Name: ${userName}</p>
  //          <p>Email: ${email}</p>
  //          <p>Message: ${message}</p>`,
  //     text: `${userName} ${email} a envoyé le message suivante :${message}`,
  //     replyTo: email,
  //   },
  //   (err, info) => {
  //     if (err) {
  //       console.error(err);
  //       res.sendStatus(500);
  //     } else {
  //       console.log(info);
  //       res.sendStatus(200);
  //     }
  //   }
  // );
});

/* ********************** server setup ********************** */ app.listen(
  PORT,
  () => {
    if (!inTestEnv) {
      console.log(`Server running on port ${PORT}`);
    }
  }
);

/* ********************** process setup : improves error reporting ********************** */
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('uncaughtException', (error) => {
  console.error('uncaughtException', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('beforeExit', () => {
  app.close((error) => {
    if (error) console.error(JSON.stringify(error), error.stack);
  });
});
