require("dotenv").config();
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendEmail = (from, email, subject, body, bcc) => {
  try {
    const mailPromise = new Promise((resolve, reject) => {
      var mailOptions = {
        from: from,
        to: email,
        subject: subject,
        html: body,
        bcc: bcc ? bcc : "",
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
    return mailPromise;
  } catch (error) {
    reject(error);
  }
};
