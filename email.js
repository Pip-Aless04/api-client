import { createTransport } from "nodemailer";
// import nodemailer from "nodemailer";

const userGmail = process.env.USER_GMAIL;
const passAppGmail = process.env.PASS_APP_GMAIL;

// Set up Nodemailer transporter
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: userGmail,
    pass: passAppGmail,
  },
});

// Define a route for sending emails
// Set up email options
const mailOptions = {
  from: userGmail,
  to: 'alantiaribal2404@gmail.com',
  subject: "Test Email 222",
  text: "This is a test email from Node.js!",
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  }
  console.log("Email sent: " + info.response);
});