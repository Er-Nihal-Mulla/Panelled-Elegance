'use server';

/**
 * @fileOverview Sanitize contact form inquiries using an LLM to check for malicious or unsafe information.
 *
 * - sanitizeInquiry - A function that sanitizes contact form inquiries.
 * - SanitizeInquiryInput - The input type for the sanitizeInquiry function.
 * - SanitizeInquiryOutput - The return type for the sanitizeInquiry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SanitizeInquiryInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the inquiry.'),
  email: z.string().email().describe('The email address of the person submitting the inquiry.'),
  message: z.string().describe('The message content from the contact form.'),
});
export type SanitizeInquiryInput = z.infer<typeof SanitizeInquiryInputSchema>;

const SanitizeInquiryOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the message is safe and free of malicious content.'),
  reason: z.string().optional().describe('The reason why the message is considered unsafe, if applicable.'),
});
export type SanitizeInquiryOutput = z.infer<typeof SanitizeInquiryOutputSchema>;

export async function sanitizeInquiry(input: SanitizeInquiryInput): Promise<SanitizeInquiryOutput> {
  return sanitizeInquiryFlow(input);
}

const sanitizeInquiryPrompt = ai.definePrompt({
  name: 'sanitizeInquiryPrompt',
  input: {schema: SanitizeInquiryInputSchema},
  output: {schema: SanitizeInquiryOutputSchema},
  prompt: `You are an AI assistant specializing in identifying malicious or unsafe content in contact form inquiries.

  Analyze the following contact form message and determine if it contains any potentially harmful content, such as spam, phishing attempts, or offensive language. Also consider if it contains Personally Identifiable Information(PII).

  Name: {{{name}}}
  Email: {{{email}}}
  Message: {{{message}}}

  Respond with a JSON object indicating whether the message is safe (isSafe: true/false) and, if not safe, provide a brief reason (reason: string). Be conservative in your determination.
  If the message is safe, reason should be omitted.
  `,
});

const sanitizeInquiryFlow = ai.defineFlow(
  {
    name: 'sanitizeInquiryFlow',
    inputSchema: SanitizeInquiryInputSchema,
    outputSchema: SanitizeInquiryOutputSchema,
  },
  async input => {
    const {output} = await sanitizeInquiryPrompt(input);
    return output!;
  }
);
