// utils/email.js
const nodemailer = require("nodemailer");

async function sendEmail({ to, subject, text }) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS, // Environment variable for email address
      pass: process.env.EMAIL_PASSWORD, // Environment variable for email password
    },
  });

  let info = await transporter.sendMail({
    from: `"Your Name" <${process.env.EMAIL_ADDRESS}>`, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;
