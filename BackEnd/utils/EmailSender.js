const nodemailer = require('nodemailer');
const connection = require('../Config/db')

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'majidali37406@gmail.com',
    pass: 'vknu jabk glyl sonm'
  }
});

exports.sendEmail = async (recipientEmail, subject, text) => {
  try {
    // Define email options
    const mailOptions = {
      from: 'info@rooftop.com',
      to: recipientEmail,
      subject: subject,
      text: text
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Throw error to handle it in the calling function
  }
};

exports.emailverify = async (email) =>{
  try {
  
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  
    const mailOptions = {
        from: 'info@rooftop.com',
        to: email,
        subject: 'Your email Verification code',
        html: `<p>Your verification code is ${otp} . This is valid for 3 days RoofTop cultivators</p>`
    };

    await transporter.sendMail(mailOptions);

    connection.query(`UPDATE users SET otp = '${otp}' WHERE email = '${email}'`, (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully updated otp");
      }
    });
    

    console.log("email sent with otp")
} catch (error) {
    console.error(error);
}
}