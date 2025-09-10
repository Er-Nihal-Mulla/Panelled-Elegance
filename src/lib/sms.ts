// src/lib/sms.ts
'use server';

import Twilio from 'twilio';

export async function sendSms(message: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  const toPhoneNumber = process.env.OWNER_PHONE_NUMBER;

  if (!accountSid) {
    throw new Error('Twilio service is not configured: TWILIO_ACCOUNT_SID is missing from environment variables.');
  }
  if (!authToken) {
    throw new Error('Twilio service is not configured: TWILIO_AUTH_TOKEN is missing from environment variables.');
  }
  if (!fromPhoneNumber) {
    throw new Error('Twilio service is not configured: TWILIO_PHONE_NUMBER is missing from environment variables.');
  }
  if (!toPhoneNumber) {
    throw new Error('Twilio service is not configured: OWNER_PHONE_NUMBER is missing from environment variables.');
  }

  const client = Twilio(accountSid, authToken);

  try {
    await client.messages.create({
      body: message,
      from: fromPhoneNumber,
      to: toPhoneNumber,
    });
    console.log('SMS sent successfully!');
  } catch (error) {
    console.error('Failed to send SMS via Twilio:', error);
    // Re-throw the original error to be displayed on the client
    if (error instanceof Error) {
        throw new Error(`Failed to send SMS: ${error.message}`);
    }
    throw new Error('An unknown error occurred while sending the SMS.');
  }
}
