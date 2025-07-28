// @ts-ignore
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    console.log('API route called');
    
    const body = await req.json();
    console.log('Request body:', body);
    
    const { from_name, from_email, phone_number, message } = body;
    console.log('Extracted data:', { from_name, from_email, phone_number, message });

    const subject = `Contact Form Submission from ${from_name}`;
    const text = `Name: ${from_name}\nEmail: ${from_email}\nPhone: ${phone_number}\nMessage: ${message}`;
    const html = `<b>Name:</b> ${from_name}<br/><b>Email:</b> ${from_email}<br/><b>Phone:</b> ${phone_number}<br/><b>Message:</b> ${message}`;

    console.log('Creating transporter...');
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'contactwebsite988@gmail.com',
        pass: 'uzpz swow ueio zygd',
      },
    });

    console.log('Transporter created, sending mail...');
    await transporter.sendMail({
      from: 'noreply@confortplus65.com',
      to: 'walidattou123A@gmail.com',
      subject,
      text,
      html,
      replyTo: from_email,
    });

    console.log('Email sent successfully');
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Detailed error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: "Erreur lors de l'envoi du message.",
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 