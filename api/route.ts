// @ts-ignore
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { from_name, from_email, phone_number, message } = await req.json();

    const subject = `Contact Form Submission from ${from_name}`;
    const text = `Name: ${from_name}\nEmail: ${from_email}\nPhone: ${phone_number}\nMessage: ${message}`;
    const html = `<b>Name:</b> ${from_name}<br/><b>Email:</b> ${from_email}<br/><b>Phone:</b> ${phone_number}<br/><b>Message:</b> ${message}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'contactwebsite988@gmail.com',
        pass: 'uzpz swow ueio zygd',
      },
    });

    await transporter.sendMail({
      from: 'noreply@confortplus65.com',
      to: 'walidattou123A@gmail.com',
      subject,
      text,
      html,
      replyTo: from_email,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Nodemailer error:', error);
    return new Response(JSON.stringify({ success: false, error: "Erreur lors de l'envoi du message." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 