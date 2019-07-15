const Subscription = require('../database/models/subscription');
var nodemailer = require('nodemailer');


module.exports = (req, res) => {
  const {mail} = req.body;

    Subscription.create({
    ...req.body,

  }, (error, post) => {
    res.redirect("/");
  });
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adxinteractive@gmail.com',
      pass: 'varunrahul@2019'
    }
  });
  
  var mailOptions = {
    from: 'adxinteractive@gmail.com',
    to: mail,
    subject: 'Thanks for your interest',
    text: 'We appreciate your efforts for taking a step closer to promote your brand through ADX Interactive.Our team will reach out to you shortly.'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}