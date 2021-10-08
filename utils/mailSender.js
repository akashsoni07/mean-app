require("dotenv").config();
const nodemailer = require("nodemailer");
const sgTransport = require('nodemailer-sendgrid-transport');

const mailSender = async (options) => {
  const mailTransporter = nodemailer.createTransport(sgTransport({
    auth: {
      api_key: process.env.EMAIL_API_KEY
    }
  }));

  const mailOptions = {
    from: `"MEAN App" <akashsoni4078@gmail.com>`,
    to: options.email,
    replyTo: 'aakashsoni10101010@gmail.com',
    subject: options.subject,
    html: options.html 
  };

  await mailTransporter.sendMail(mailOptions);
};

module.exports = mailSender;
