import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { tripDetails, gdprConsent } = body;

        if (!gdprConsent) {
            return NextResponse.json(
                { error: 'GDPR consent is required' },
                { status: 400 }
            );
        }

        // In a real app, you would use a service like SendGrid, Resend, or Nodemailer
        // For this demo, we'll just log the email content
        const emailContent = `
      Project Voyager - Trip Booking Confirmation (DEMO)
      
      Destination: ${tripDetails.destination}
      Departure: ${new Date(tripDetails.departureDate).toLocaleDateString('en-GB')}
      ${tripDetails.returnDate ? `Return: ${new Date(tripDetails.returnDate).toLocaleDateString('en-GB')}` : ''}
      
      Flight:
      - Airline: ${tripDetails.flight.airline}
      - Route: ${tripDetails.flight.route}
      - Time: ${tripDetails.flight.time}
      - Class: ${tripDetails.flight.class}
      - Price: ${tripDetails.currency}${tripDetails.flight.price}
      
      Hotel:
      - Name: ${tripDetails.hotel.name}
      - Location: ${tripDetails.hotel.location}
      - Rating: ${tripDetails.hotel.rating}/5.0
      - Price: ${tripDetails.currency}${tripDetails.hotel.price} per night
      
      Total Cost: ${tripDetails.currency}${tripDetails.totalCost}
      
      ---
      This is a DEMONSTRATION booking. No payment has been processed.
      This email was sent with user consent for demo purposes only.
    `;

        console.log('=== EMAIL TO SEND ===');
        console.log('To: nicola@empowervaservices.co.uk');
        console.log('Subject: Trip Booking Confirmation - ' + tripDetails.destination);
        console.log(emailContent);
        console.log('===================');

        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({
            success: true,
            message: 'Email sent successfully (demo mode - check server logs)'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
