'use server';
/**
 * @fileOverview Generates paneling ideas based on user preferences.
 *
 * - generatePanelingIdeas - A function that generates paneling ideas.
 * - GeneratePanelingIdeasInput - The input type for the generatePanelingIdeas function.
 * - GeneratePanelingIdeasOutput - The return type for the generatePanelingIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePanelingIdeasInputSchema = z.object({
  roomType: z.string().describe('The type of room (e.g., living room, bedroom).'),
  style: z.string().describe('The desired style (e.g., modern, classic, minimalist).'),
  budget: z.string().describe('The budget for the project (e.g., low, medium, high).'),
});
export type GeneratePanelingIdeasInput = z.infer<typeof GeneratePanelingIdeasInputSchema>;

const GeneratePanelingIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('An array of paneling ideas.'),
});
export type GeneratePanelingIdeasOutput = z.infer<typeof GeneratePanelingIdeasOutputSchema>;

export async function generatePanelingIdeas(input: GeneratePanelingIdeasInput): Promise<GeneratePanelingIdeasOutput> {
  return generatePanelingIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePanelingIdeasPrompt',
  input: {schema: GeneratePanelingIdeasInputSchema},
  output: {schema: GeneratePanelingIdeasOutputSchema},
  prompt: `You are an interior design expert specializing in paneling.

  Generate 3 unique paneling ideas based on the following preferences:

  Room Type: {{{roomType}}}
  Style: {{{style}}}
  Budget: {{{budget}}}

  Each idea should be a concise description of the paneling, including materials, layout, and design elements.
  Return your answer as a JSON array of strings.
  `,
});

const generatePanelingIdeasFlow = ai.defineFlow(
  {
    name: 'generatePanelingIdeasFlow',
    inputSchema: GeneratePanelingIdeasInputSchema,
    outputSchema: GeneratePanelingIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
