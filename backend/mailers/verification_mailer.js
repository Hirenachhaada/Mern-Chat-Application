const nodemailer = require("../config/nodemailer");

const sendEmail = (name, email, token) => {
    const mailOptions = {
        from: "'Let's Talk' <foo@example.com>",
        to: email,
        subject: "Let's Talk Account Verification",
        html: `
        <html>
          <head>
            <style>
              /* Add CSS styles for better email formatting */
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                text-align: center;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
              }
              p {
                font-size: 16px;
              }
              a {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0;
                background-color: #007BFF;
                color: #fff !important;
                text-decoration: none;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Hello ${name},</h1>
              <p>Thank you for signing up with Let's Talk! To get started, please verify your email by clicking the button below:</p>
              <a href="${process.env.LOCALHOST}/verify/${token}">Verify Your Email</a>
              <p>If the button above doesn't work, you can also copy and paste the following link into your web browser:</p>
              <p><a href="${process.env.LOCALHOST}/verify/${token}">${process.env.LOCALHOST}/verify/${token}</a></p>
              <p>If you didn't sign up for an Let's Talk account, please disregard this email.</p>
            </div>
          </body>
        </html>
      `,
    };

    nodemailer.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: " + error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

module.exports = sendEmail;
