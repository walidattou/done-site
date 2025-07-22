import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { from_name, from_email, phone_number, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // Set in Vercel dashboard
      pass: process.env.EMAIL_PASS, // Set in Vercel dashboard
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
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
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
} 