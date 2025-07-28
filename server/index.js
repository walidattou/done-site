import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  
  try {
    const { from_name, from_email, phone_number, message } = req.body;
    
    console.log('Extracted data:', { from_name, from_email, phone_number, message });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'contactwebsite988@gmail.com',
        pass: 'uzpz swow ueio zygd',
      },
    });

    console.log('Transporter created successfully');

    const mailOptions = {
      from: 'noreply@confortplus65.com',
      to: 'walidattou123A@gmail.com',
      replyTo: from_email,
      subject: `Contact Form Submission from ${from_name}`,
      text: `Name: ${from_name}\nEmail: ${from_email}\nPhone: ${phone_number}\nMessage: ${message}`,
      html: `<b>Name:</b> ${from_name}<br/><b>Email:</b> ${from_email}<br/><b>Phone:</b> ${phone_number}<br/><b>Message:</b> ${message}`,
    };

    console.log('Mail options prepared:', mailOptions);

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ success: true, message: 'Email sent!' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 