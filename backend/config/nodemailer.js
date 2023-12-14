const nodemailer = require("nodemailer");

// temporary mailing service is used to send and recieve mails.
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  transporter: transporter,
};
