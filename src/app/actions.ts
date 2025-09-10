// src/app/actions.ts
'use server';

import { z } from 'zod';
import { generatePanelingIdeas } from '@/ai/flows/generate-paneling-ideas';
import { sanitizeInquiry } from '@/ai/flows/sanitize-contact-form-inquiries';
import { addEnquiry } from '@/lib/firebase/actions';
import { isFirebaseEnabled } from '@/lib/firebase/config';
import { sendSms } from '@/lib/sms';

// Contact Form Action
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().optional(),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
});

type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    phone?: string[];
  };
  isSuccess: boolean;
};

export async function submitInquiry(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    phone: formData.get('phone'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
      isSuccess: false,
    };
  }

  const { name, email, message, phone } = validatedFields.data;
  const isFirebaseConfigured = isFirebaseEnabled();

  try {
    // 1. Sanitize the input using AI
    const sanitizationResult = await sanitizeInquiry({ name, email, message: message || '' });

    if (!sanitizationResult.isSafe) {
      // If the AI flags the content, reject it.
      return {
        message: `Our AI security system flagged this message as potentially unsafe. Reason: ${sanitizationResult.reason}`,
        isSuccess: false,
      };
    }
    
    // 2. If safe, add to Firestore (if configured)
    if(isFirebaseConfigured) {
      await addEnquiry({ name, email, message: message || '', phone });
    } else {
      console.log("Firebase not configured. Skipping database write.");
      // Simulate a delay if Firebase isn't set up
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // 3. Send SMS notification
    const smsMessage = `New inquiry from ${name} (${email}, ${phone}): ${message ? message.substring(0, 300) : 'No message provided.'}`;
    await sendSms(smsMessage);


    return {
      message: "Thank you for your inquiry! We'll be in touch soon.",
      isSuccess: true,
    };
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    // Check if the error is from our explicit re-throw in sendSms
    if (error instanceof Error && error.message.includes('SMS')) {
        return {
            message: "Your inquiry was received, but we failed to send an SMS notification. Please check SMS service configuration.",
            isSuccess: false,
        };
    }
    return {
      message: 'An unexpected error occurred. Please try again later.',
      isSuccess: false,
    };
  }
}


// Idea Generator Action
const ideaSchema = z.object({
  roomType: z.string(),
  style: z.string(),
  budget: z.string(),
});

type IdeaGeneratorState = {
  ideas?: string[];
  message?: string;
};

export async function generateIdeas(
  prevState: IdeaGeneratorState,
  formData: FormData
): Promise<IdeaGeneratorState> {
    const validatedFields = ideaSchema.safeParse({
        roomType: formData.get('roomType'),
        style: formData.get('style'),
        budget: formData.get('budget'),
    });

    if (!validatedFields.success) {
        return { message: 'Invalid input.' };
    }

    try {
        const result = await generatePanelingIdeas(validatedFields.data);
        return { ideas: result.ideas };
    } catch (error) {
        console.error('Error generating ideas:', error);
        return { message: 'Failed to generate ideas. Please try again.' };
    }
}
