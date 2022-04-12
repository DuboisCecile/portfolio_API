const nodeMailjet = require('node-mailjet');
const { API_KEY, SECRET_KEY } = require('./env');

const mailjet = nodeMailjet.connect(API_KEY, SECRET_KEY);

const request = mailjet.post('send', { version: 'v3.1' }).request({
  Messages: [
    {
      From: {
        Email: 'contact@duboiscecile.fr',
        Name: 'Cécile',
      },
      To: [
        {
          Email: 'duboiscecilepro@gmail.com',
          Name: 'Cécile',
        },
      ],
      Subject: 'Demande de contact',
      TextPart: 'Demande de contact',
      HTMLPart: '<h3>Ceci est un message de test</a>!</h3><br />Essai',
      CustomID: 'AppGettingStartedTest',
    },
  ],
});
request
  .then((result) => {
    console.log(result.body);
  })
  .catch((err) => {
    console.log(err.statusCode);
  });
