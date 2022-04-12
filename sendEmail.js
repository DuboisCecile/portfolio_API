const emailer = require('./mailer');

emailer.sendMail(
  {
    from: 'duboiscecilepro@gmail.com',
    to: 'duboiscecilepro@gmail.com',
    subject: 'This is a test email for Quest Send a mail',
    text: 'Hello world',
    html: "<p>Hello <em>world !</em></p><p>This email is a test for the challenge 'Send a mail' of WCS. If you can see this text, it means that it worked !!!</p>",
  },
  (err, info) => {
    if (err) console.error(err);
    else console.log(info);
  }
);
