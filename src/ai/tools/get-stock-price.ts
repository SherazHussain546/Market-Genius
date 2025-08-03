'use server';

/**
 * @fileOverview This file defines a Genkit tool for fetching the current price of a stock or cryptocurrency.
 *
 * - getStockPrice - A tool that fetches the current market value of a stock or cryptocurrency.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const getStockPrice = ai.defineTool(
  {
    name: 'getStockPrice',
    description: 'Returns the current market value of a stock or cryptocurrency.',
    inputSchema: z.object({
      ticker: z.string().describe('The ticker symbol of the stock or cryptocurrency (e.g., AAPL, BTC-USD).'),
    }),
    outputSchema: z.number(),
  },
  async (input) => {
    console.log(`Fetching price for ${input.ticker}`);

    if (input.ticker.includes('-USD')) {
      // It's a cryptocurrency
      const cryptoSymbol = input.ticker.replace('-USD', 'USDT');
      const url = `https://api.crypto.com/v2/public/get-ticker?instrument_name=${cryptoSymbol}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Crypto.com API request failed with status ${response.status}`);
        }
        const data = await response.json();
        const price = data?.result?.data?.a;
        if (price) {
          return parseFloat(price);
        }
        throw new Error('Could not parse price from Crypto.com API response.');
      } catch (error) {
        console.error('Error fetching from Crypto.com API:', error);
        throw new Error('Failed to fetch cryptocurrency price.');
      }
    } else {
      // It's a stock
      const apiKey = process.env.FINANCIAL_DATA_API_KEY;
      if (!apiKey) {
        throw new Error('FINANCIAL_DATA_API_KEY is not set.');
      }
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${input.ticker}&apikey=${apiKey}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Alpha Vantage API request failed with status ${response.status}`);
        }
        const data = await response.json();
        const price = data?.['Global Quote']?.['05. price'];
        if (price) {
          return parseFloat(price);
        }
        throw new Error('Could not parse price from Alpha Vantage API response.');
      } catch (error) {
        console.error('Error fetching from Alpha Vantage API:', error);
        throw new Error('Failed to fetch stock price.');
      }
    }
  }
);
