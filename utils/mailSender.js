require("dotenv").config();
const nodemailer = require("nodemailer");
//const sgTransport = require('nodemailer-sendgrid-transport');
//EMAIL_API_KEY=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

const mailSender = async (options) => {
  /* const mailTransporter = nodemailer.createTransport(sgTransport({
    auth: {
      api_key: process.env.EMAIL_API_KEY
    }
  }));*/

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"MEAN App" <akashsoni4078@gmail.com>`,
    to: options.email,
    replyTo: "aakashsoni10101010@gmail.com",
    subject: options.subject,
    html: options.html,
  };

  await mailTransporter.sendMail(mailOptions);
};

module.exports = mailSender;
