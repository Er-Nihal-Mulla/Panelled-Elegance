// src/lib/sms.ts
'use server';

import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const toPhoneNumber = process.env.OWNER_PHONE_NUMBER;

const isTwilioEnabled = accountSid && authToken && fromPhoneNumber && toPhoneNumber;

const client = isTwilioEnabled ? Twilio(accountSid, authToken) : null;

export async function sendSms(message: string): Promise<void> {
  if (!client || !isTwilioEnabled) {
    console.error('Twilio is not configured. Skipping SMS.');
    // We throw an error to make sure the client-side is aware of the failure.
    throw new Error('Twilio service is not configured. Please check environment variables.');
  }
  
  if (!toPhoneNumber) {
    console.warn('Owner phone number is not set. Skipping SMS.');
    throw new Error('Owner phone number (OWNER_PHONE_NUMBER) is not set in environment variables.');
  }

  try {
    await client.messages.create({
      body: message,
      from: fromPhoneNumber,
      to: toPhoneNumber,
    });
    console.log('SMS sent successfully!');
  } catch (error) {
    console.error('Failed to send SMS:', error);
    // We re-throw the error so the calling function can be aware of the failure.
    throw new Error('Failed to send SMS notification.');
  }
}
