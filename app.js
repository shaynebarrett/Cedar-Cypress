const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const request = require("request");
const https = require("https");
const routes = require ('./routes');

const app = express();

app.set('views', path.join(__dirname, 'views'));

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));



// Body Parser Middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {

  res.render('index', {
    layout: false
  });
});

app.get('/documents', (req, res) => {

  res.render('documents', {
    layout: false
  });
});

app.get('/blog', (req, res) => {

  res.render('blog', {
    layout: false
  });
});

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>First Name: ${req.body.fname}</li>
      <li>Last Name: ${req.body.lname}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'shayne.barrett27@gmail.com', // generated ethereal user
      pass: 'Pantera_27!' // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Cedar & Cypress Web" <shayne.barrett27@gmail.com>', // sender address
    to: 'shayne.barrett@wsu.edu, ryanmaul91@gmail.com', // list of receivers
    subject: 'CCT Contact Request', // Subject line
    text: 'You have a new contact request', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('index', {layout: false, msg: 'Email has been sent'});
    //res.render('index', {msg: 'Email has been sent'});
  });

});


app.use ('/', routes);
app.listen(3000, () => console.log('Server started...'));
