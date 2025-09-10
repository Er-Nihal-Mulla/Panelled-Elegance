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
  if (!client) {
    console.log('Twilio is not configured. Skipping SMS.');
    console.log(`SMS message that would have been sent to ${toPhoneNumber}: ${message}`);
    return;
  }
  
  if (!toPhoneNumber) {
    console.warn('Owner phone number is not set. Skipping SMS.');
    return;
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
