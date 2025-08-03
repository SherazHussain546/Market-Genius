'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a summary of recent news and market sentiment related to a specific stock.
 *
 * - generateSignalContext - A function that triggers the signal context generation flow.
 * - GenerateSignalContextInput - The input type for the generateSignalContext function.
 * - GenerateSignalContextOutput - The return type for the generateSignalContext function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSignalContextInputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock.'),
});
export type GenerateSignalContextInput = z.infer<typeof GenerateSignalContextInputSchema>;

const GenerateSignalContextOutputSchema = z.object({
  summary: z.string().describe('A summary of recent news and market sentiment related to the stock.'),
});
export type GenerateSignalContextOutput = z.infer<typeof GenerateSignalContextOutputSchema>;

export async function generateSignalContext(input: GenerateSignalContextInput): Promise<GenerateSignalContextOutput> {
  return generateSignalContextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSignalContextPrompt',
  input: {schema: GenerateSignalContextInputSchema},
  output: {schema: GenerateSignalContextOutputSchema},
  prompt: `You are a financial analyst summarizing recent news and market sentiment for a given stock ticker.

  Provide a concise summary (under 200 words) of the recent news and market sentiment related to {{ticker}}.
  Focus on information that would be relevant to understanding a buy or sell signal for this stock.
`,
});

const generateSignalContextFlow = ai.defineFlow(
  {
    name: 'generateSignalContextFlow',
    inputSchema: GenerateSignalContextInputSchema,
    outputSchema: GenerateSignalContextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
