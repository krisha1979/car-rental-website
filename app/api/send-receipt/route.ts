import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      firstName,
      lastName,
      carName,
      totalPrice,
      pickup,
      dropoff,
      days
    } = body;

    // Basic Validation
    if (!email || !firstName || !carName || !totalPrice) {
      console.error('Missing fields:', { email, firstName, carName, totalPrice });
      return NextResponse.json(
        { message: 'Missing required fields for receipt.' },
        { status: 400 }
      );
    }

    // SMTP Credential Check
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP credentials missing in .env.local');
      return NextResponse.json(
        { message: 'Email server credentials not configured.' },
        { status: 500 }
      );
    }

    // Configure Nodemailer for Gmail
    // We use service: 'gmail' which is simpler and more reliable for Gmail accounts.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Use a 16-character App Password here
      },
    });

    // Create the branded HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
        <h2 style="color: #000; text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px;">LUX RIDE - RECEIPT</h2>
        <p>Hi <strong>${firstName} ${lastName || ''}</strong>,</p>
        <p>Thank you for choosing Lux Ride. Your payment was successful!</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Reservation Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Vehicle</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${carName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Duration</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${days} Day(s)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Pick-up</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${pickup || 'TBD'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Drop-off</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${dropoff || 'TBD'}</td>
            </tr>
            <tr style="font-size: 1.2em;">
              <td style="padding: 15px 0 0 0;"><strong>Total Paid</strong></td>
              <td style="padding: 15px 0 0 0; text-align: right; color: #000;"><strong>${totalPrice}</strong></td>
            </tr>
          </table>
        </div>
        
        <p style="margin-top: 30px;">Your vehicle will be ready for you at the pick-up location. If you have any questions, please contact our support team.</p>
        <p style="text-align: center; font-weight: bold; margin-top: 40px;">Safe Travels,<br/>The Lux Ride Team</p>
      </div>
    `;

    // Send the email
    // NOTE: Gmail REQUIRES the 'from' email to be your SMTP_USER or a verified alias.
    const info = await transporter.sendMail({
      from: `"Lux Ride" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Payment Receipt: ${carName}`,
      html: htmlContent,
    });

    console.log('Nodemailer sent: %s', info.messageId);

    return NextResponse.json(
      { message: 'Receipt sent successfully', messageId: info.messageId },
      { status: 200 }
    );

  } catch (error) {
    console.error('Nodemailer failure:', error);
    return NextResponse.json(
      { message: 'Failed to send receipt email', error: String(error) },
      { status: 500 }
    );
  }
}
