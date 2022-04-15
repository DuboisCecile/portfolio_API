const nodeMailjet = require('node-mailjet');
const express = require('express');

const cors = require('cors');
const {
  PORT,
  CORS_ALLOWED_ORIGINS,
  API_KEY,
  SECRET_KEY,
  SENDER_EMAIL,
  RECEIVER_EMAIL,
} = require('./env');

const app = express();
app.use(express.json());

// /* ********************** app settings ********************** */
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

app.get('/test', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  const message = 'It woooooorks!\n';
  const version = `NodeJS ${process.versions.node}\n`;
  const response = [message, version].join('\n');
  res.end(response);
});

/* ********************** mail sending ********************** */
app.post('/contactMail', (req, res) => {
  const { email, message, userName } = req.body;
  const mailjet = nodeMailjet.connect(API_KEY, SECRET_KEY);
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: SENDER_EMAIL,
          Name: userName,
        },
        To: [
          {
            Email: RECEIVER_EMAIL,
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
      console.log(result);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/* ********************** server setup ********************** */ app.listen(
  PORT,
  () => {
    console.log(`Server running on port ${PORT}`);
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
