'use server';

/**
 * @fileOverview This file defines a Genkit tool for fetching financial news and analyzing its sentiment.
 *
 * - getFinancialNewsAndSentiment - A tool that fetches news and uses the Google Cloud Natural Language API.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { LanguageServiceClient } from '@google-cloud/language';

// IMPORTANT: You must enable the "Cloud Natural Language API" in your Google Cloud project for this to work.
const nlpClient = new LanguageServiceClient();

export const getFinancialNewsAndSentiment = ai.defineTool(
  {
    name: 'getFinancialNewsAndSentiment',
    description: 'Fetches recent news articles for a financial ticker and analyzes their sentiment using the Google Cloud Natural Language API.',
    inputSchema: z.object({
      ticker: z.string().describe('The ticker symbol to search news for (e.g., AAPL, GOOGL).'),
    }),
    outputSchema: z.object({
      articles: z.array(z.object({
        title: z.string(),
        url: z.string(),
        sentimentScore: z.number().describe('A score from -1.0 (very negative) to 1.0 (very positive).'),
        sentimentMagnitude: z.number().describe('The overall strength of emotion.'),
      })),
      overallSentiment: z.enum(['Positive', 'Negative', 'Neutral', 'Mixed']).describe('The aggregated sentiment from all articles.'),
    }),
  },
  async (input) => {
    console.log(`Fetching news and sentiment for ${input.ticker}`);
    const apiKey = process.env.FINANCIAL_DATA_API_KEY;
    if (!apiKey) {
      throw new Error('FINANCIAL_DATA_API_KEY is not set.');
    }

    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${input.ticker}&apikey=${apiKey}&limit=5`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Alpha Vantage News API request failed with status ${response.status}`);
      }
      const newsData = await response.json();
      const articles = newsData.feed?.slice(0, 5) || []; // Limit to 5 articles

      if (articles.length === 0) {
        return { articles: [], overallSentiment: 'Neutral' };
      }

      const analyzedArticles = [];
      let totalScore = 0;

      for (const article of articles) {
        const document = {
          content: `${article.title}. ${article.summary}`,
          type: 'PLAIN_TEXT' as const,
        };

        try {
          const [result] = await nlpClient.analyzeSentiment({ document });
          const sentiment = result.documentSentiment || { score: 0, magnitude: 0 };
          
          totalScore += sentiment.score || 0;
          
          analyzedArticles.push({
            title: article.title,
            url: article.url,
            sentimentScore: sentiment.score || 0,
            sentimentMagnitude: sentiment.magnitude || 0,
          });

        } catch (nlpError) {
          console.error('Error analyzing sentiment for article:', article.title, nlpError);
          // If NLP fails for one article, just skip it.
        }
      }
      
      const avgScore = totalScore / analyzedArticles.length;
      let overallSentiment: 'Positive' | 'Negative' | 'Neutral' | 'Mixed' = 'Neutral';
      if (avgScore > 0.2) overallSentiment = 'Positive';
      else if (avgScore < -0.2) overallSentiment = 'Negative';
      else if (avgScore > -0.2 && avgScore < 0.2 && totalScore !== 0) overallSentiment = 'Mixed';


      return {
        articles: analyzedArticles,
        overallSentiment,
      };

    } catch (error) {
      console.error('Error fetching from Alpha Vantage News API:', error);
      throw new Error('Failed to fetch financial news.');
    }
  }
);