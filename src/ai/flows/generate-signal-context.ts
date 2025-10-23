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
import { getStockPrice } from '../tools/get-stock-price';
import { getFinancialNewsAndSentiment } from '../tools/get-financial-news';

const GenerateSignalContextInputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock.'),
});
export type GenerateSignalContextInput = z.infer<typeof GenerateSignalContextInputSchema>;

const GenerateSignalContextOutputSchema = z.object({
  signal: z.enum(['buy', 'sell', 'hold']).describe('The recommended trading signal.'),
  confidence: z.number().min(0).max(1).describe('The confidence level of the signal, from 0 to 1.'),
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
  tools: [getStockPrice, getFinancialNewsAndSentiment],
  prompt: `You are a financial analyst providing a trading signal for a given stock ticker.

  Based on recent news, market sentiment, and the current stock price, generate a trading signal (buy, sell, or hold) for {{ticker}}.
  Use the getStockPrice tool to get the current price.
  Use the getFinancialNewsAndSentiment tool to get structured data on news headlines and their sentiment scores.
  
  In your summary, reference the specific sentiment (positive, negative, neutral) from the news analysis and the current stock price to justify your recommendation.
  Provide a confidence score (0.0 to 1.0) for this signal.
  Finally, provide a concise summary (under 200 words) of the reasoning.
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
