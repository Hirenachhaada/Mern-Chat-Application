const nodemailer = require("nodemailer");

module.exports = async function sendEmail(email, subject, link) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: `<h1>Click on the link to verify email</h1>
      <a href="${link}">Click here</a>`,
    });
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
};
