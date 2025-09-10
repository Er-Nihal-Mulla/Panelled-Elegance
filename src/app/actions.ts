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
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
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

  try {
    const isFirebaseConfigured = isFirebaseEnabled();

    // 1. Sanitize the input using AI
    const sanitizationResult = await sanitizeInquiry({ name, email, message });

    if (!sanitizationResult.isSafe) {
      // If the AI flags the content, reject it.
      // In a real app, you might also log this attempt for security monitoring.
      return {
        message: `Our AI security system flagged this message as potentially unsafe. Reason: ${sanitizationResult.reason}`,
        isSuccess: false,
      };
    }
    
    // 2. If safe, add to Firestore (if configured)
    if(isFirebaseConfigured) {
      await addEnquiry({ name, email, message, phone });
    } else {
      // Simulate a delay if Firebase isn't set up
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // 3. Send SMS notification
    try {
        await sendSms(`New inquiry from ${name} (${email}, ${phone}): ${message}`);
    } catch (smsError) {
        console.warn('SMS sending failed. The inquiry was saved, but the notification was not sent.', smsError);
        // We don't return an error to the user, as the main action (saving the inquiry) was successful.
    }


    return {
      message: "Thank you for your inquiry! We'll be in touch soon.",
      isSuccess: true,
    };
  } catch (error) {
    console.error('Error submitting inquiry:', error);
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
