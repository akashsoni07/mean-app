require("dotenv").config();
const nodemailer = require("nodemailer");

const mailSender = async (options) => {
  const transporter = nodemailer.createTransport({
    service: gmail,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,   
    },
  });

  const mailOptions = {
    from: "MEAN App <hello@mean.com>",
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  await transporter.sendMail(mailOptions);
};

module.exports = mailSender;
