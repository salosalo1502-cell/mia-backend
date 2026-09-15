
import transporter from '../config/mail.js';

const sendEmail = async (req, res) => {

  const { name, email, company, message } = req.body;

 

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `Message from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Company: ${company}

Message:
${message}
    `
  };

  try {

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully!'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Email could not be sent'
    });

  }

};

export default sendEmail;