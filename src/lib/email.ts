// Email client — mock for development
// In production, use Nodemailer with Gmail SMTP

export async function sendBookingConfirmation(booking: {
  customerName: string;
  customerEmail: string;
  bookingCode: string;
  bookingDate: Date | string;
  total: number;
}) {
  // In production, this sends actual email via Nodemailer
  console.log("[EMAIL MOCK] Sending booking confirmation to:", booking.customerEmail);
  console.log("[EMAIL MOCK] Booking code:", booking.bookingCode);
  console.log("[EMAIL MOCK] Total:", booking.total);
  return true;
}

export async function sendContactMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  console.log("[EMAIL MOCK] Contact form from:", data.name, data.email);
  console.log("[EMAIL MOCK] Message:", data.message);
  return true;
}
