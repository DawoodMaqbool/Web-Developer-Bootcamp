const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');

exports.sendMail = async(email,token) => { //function for sending email
  var transporter = nodemailer.createTransport(smtpTransport({
    service: "gmail", 
    port: 3000, 
    auth: {user: "devcamper123@gmail.com", pass: "devcamper1234567",}
    ,})
    );
  var mailOptions = {
    from: "devcamper123@gmail.com",
    to: email,
    subject: "Sending Email using Node.js[nodemailer]",
    text: "Here is your link to reset password = " + token,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
          return false
        } else {
          console.log("Email sent: " + info.response);
          return true
        }
      });
};