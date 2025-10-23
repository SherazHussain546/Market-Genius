import { config } from 'dotenv';
config();

import '@/ai/flows/generate-signal-context.ts';
import '@/ai/tools/get-stock-price.ts';
import '@/ai/tools/get-financial-news.ts';
