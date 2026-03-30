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
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASS?.trim();

    if (!user || !pass || pass.includes('xxxx')) {
      console.error('SMTP credentials missing or still placeholders in .env.local');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email credentials not configured. Please add your Gmail App Password to .env.local.' 
        },
        { status: 500 }
      );
    }

    // Configure Nodemailer for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    // Branded HTML Receipt Template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #eee; border-radius: 10px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        <h2 style="color: #000; text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; letter-spacing: 2px;">LUX RIDE</h2>
        <h3 style="text-align: center; color: #666; margin-top: 10px;">Payment Receipt</h3>
        
        <p style="font-size: 16px;">Hi <strong>${firstName} ${lastName || ''}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.5;">Thank you for choosing Lux Ride. Your reservation has been confirmed and payment was successful!</p>
        
        <div style="background-color: #fcfcfc; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px; margin: 25px 0;">
          <h4 style="margin: 0 0 15px 0; color: #333; border-bottom: 1px solid #eee; padding-bottom: 8px;">Reservation Summary</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #777;">Vehicle</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #000;">${carName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #777;">Duration</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #000;">${days} Day(s)</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #777;">Pick-up</td>
              <td style="padding: 10px 0; text-align: right; color: #333;">${pickup || 'Not Specified'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #777;">Drop-off</td>
              <td style="padding: 10px 0; text-align: right; color: #333;">${dropoff || 'Not Specified'}</td>
            </tr>
            <tr style="font-size: 18px;">
              <td style="padding: 20px 0 0 0; color: #000; font-weight: bold;">Total Paid</td>
              <td style="padding: 20px 0 0 0; text-align: right; color: #D4AF37; font-weight: bold;">${totalPrice}</td>
            </tr>
          </table>
        </div>
        
        <p style="font-size: 13px; color: #888; text-align: center; margin-top: 30px;">
          Your vehicle will be ready at the pick-up location. Please carry a valid ID and license.
        </p>
        
        <div style="text-align: center; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
          <p style="font-weight: bold; margin: 0; color: #000;">Safe Travels,</p>
          <p style="margin: 5px 0 0 0; color: #999;">The Lux Ride Concierge Team</p>
        </div>
      </div>
    `;

    // Send the email
    const info = await transporter.sendMail({
      from: `"Lux Ride" <${user}>`,
      to: email,
      subject: `Lux Ride Receipt: ${carName}`,
      html: htmlContent,
    });

    console.log('Nodemailer successful delivery:', info.messageId);

    return NextResponse.json(
      { success: true, message: 'Receipt sent successfully', messageId: info.messageId },
      { status: 200 }
    );

  } catch (error) {
    console.error('Nodemailer error details:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send email. Ensure you are using a 16-character Gmail App Password.', 
        error: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
