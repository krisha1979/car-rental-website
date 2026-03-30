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

    if (!email || !firstName || !carName || !totalPrice) {
      return NextResponse.json(
        { message: 'Missing required fields for receipt.' },
        { status: 400 }
      );
    }

    // Configure your SMTP settings here using Environment Variables.
    // Ensure you add these missing variables in your .env.local file!
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Create the email HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #2c3e50; text-align: center;">Payment Receipt - Car Rental</h2>
        <p>Hi <strong>${firstName} ${lastName || ''}</strong>,</p>
        <p>Thank you for choosing our car rental service. Your payment was successful!</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 10px; border-bottom: 2px solid #dee2e6; text-align: left;">Details</th>
            <th style="padding: 10px; border-bottom: 2px solid #dee2e6; text-align: right;">Value</th>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">Vehicle</td>
            <td style="padding: 10px; border-bottom: 1px solid #dee2e6; text-align: right;"><strong>${carName}</strong></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">Pick-up</td>
            <td style="padding: 10px; border-bottom: 1px solid #dee2e6; text-align: right;">${pickup || 'TBD'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">Drop-off</td>
            <td style="padding: 10px; border-bottom: 1px solid #dee2e6; text-align: right;">${dropoff || 'TBD'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">Duration</td>
            <td style="padding: 10px; border-bottom: 1px solid #dee2e6; text-align: right;">${days} Day(s)</td>
          </tr>
          <tr style="background-color: #f8f9fa; font-size: 1.1em;">
            <td style="padding: 12px; border-bottom: 1px solid #dee2e6;"><strong>Total Amount Paid</strong></td>
            <td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: right; color: #27ae60;"><strong>${totalPrice}</strong></td>
          </tr>
        </table>
        
        <p style="margin-top: 30px;">Your vehicle will be ready for you at the pick-up location. If you have any questions, please contact our support team.</p>
        
        <p style="margin-top: 40px; font-size: 12px; color: #7f8c8d; text-align: center;">
          This is an automated receipt, please do not reply to this email.
        </p>
      </div>
    `;

    // Send the email
    const info = await transporter.sendMail({
      from: `"Car Rental Service" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: `Payment Receipt for ${carName}`,
      html: htmlContent,
    });

    console.log('Message sent: %s', info.messageId);
    
    return NextResponse.json(
      { message: 'Receipt sent successfully', messageId: info.messageId },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error sending receipt email:', error);
    return NextResponse.json(
      { message: 'Failed to send receipt email', error: String(error) },
      { status: 500 }
    );
  }
}
