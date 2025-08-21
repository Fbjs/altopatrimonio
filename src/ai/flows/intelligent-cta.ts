// This file is machine-generated - edit with caution!
'use server';
/**
 * @fileOverview A call to action AI agent.
 *
 * - getIntelligentCTA - A function that handles the call to action process.
 * - IntelligentCTAInput - The input type for the getIntelligentCTA function.
 * - IntelligentCTAOutput - The return type for the getIntelligentCTA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentCTAInputSchema = z.object({
  navigationPattern: z.string().describe('The navigation pattern of the user on the website.'),
});
export type IntelligentCTAInput = z.infer<typeof IntelligentCTAInputSchema>;

const IntelligentCTAOutputSchema = z.object({
  cta: z.string().describe('The call to action to display to the user.'),
});
export type IntelligentCTAOutput = z.infer<typeof IntelligentCTAOutputSchema>;

export async function getIntelligentCTA(input: IntelligentCTAInput): Promise<IntelligentCTAOutput> {
  return intelligentCTAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentCTAPrompt',
  input: {schema: IntelligentCTAInputSchema},
  output: {schema: IntelligentCTAOutputSchema},
  prompt: `You are an expert in call to action generation.

  Based on the user's navigation pattern, you will generate a call to action to encourage the user to explore projects or schedule a meeting.

  Navigation pattern: {{{navigationPattern}}}

  Consider the navigation pattern and suggest only ONE call to action that is most relevant to the user.
  If user is browsing projects, encourage them to schedule a meeting. If the user is not browsing projects, encourage them to explore projects.
  The call to action should be concise and actionable. Do not include any explanation.  e.g. "Explore Projects" or "Schedule a Meeting".`,
});

const intelligentCTAFlow = ai.defineFlow(
  {
    name: 'intelligentCTAFlow',
    inputSchema: IntelligentCTAInputSchema,
    outputSchema: IntelligentCTAOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
