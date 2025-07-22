import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'contactwebsite988@gmail.com',
    pass: 'uzpz swow ueio zygd',
  },
});

app.post('/api/send-email', async (req, res) => {
  const { from_name, from_email, phone_number, message } = req.body;

  const mailOptions = {
    from: 'contactwebsite988@gmail.com', // Match authenticated user
    to: 'walidattou123A@gmail.com',
    replyTo: 'noreply@confortplus65.com',
    subject: `Contact Form Submission from ${from_name}`,
    text: `Name: ${from_name}\nEmail: ${from_email}\nPhone: ${phone_number}\nMessage: ${message}`,
    html: `<b>Name:</b> ${from_name}<br/><b>Email:</b> ${from_email}<br/><b>Phone:</b> ${phone_number}<br/><b>Message:</b> ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send email', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 