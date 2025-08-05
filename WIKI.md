# Welcome to the Market Genius Wiki!

This wiki provides a comprehensive overview of the Market Genius project, from its core features and technical architecture to setup and deployment guides.

**Keywords:** AI Trading Signals, Stock Market AI, Cryptocurrency Signals, Real-time Trading, Financial AI, Algorithmic Trading, Market Analysis, FinTech, Next.js, React, Google Genkit, Firebase, Tailwind CSS.

---

## Home

**Market Genius is an AI-powered financial signal platform that provides real-time trading insights for stocks and cryptocurrencies.** It leverages generative AI to analyze market data, news, and sentiment to generate actionable buy, sell, or hold signals, helping users make data-driven investment decisions.

- **Live Site:** [https://marketgenius546.netlify.app/](https://marketgenius546.netlify.app/)
- **Primary Repository:** [Link to your GitHub repo]

![Market Genius Screenshot](https://placehold.co/800x400.png)

This project is designed to be a modern, responsive, and powerful tool for traders and investors who want to harness the power of AI for market analysis.

---

## Features

Market Genius comes packed with features designed for real-time, intelligent financial analysis.

-   **Real-Time Signal Generation:** The core of the platform. It continuously generates buy/sell/hold signals for a curated list of stocks and cryptocurrencies.
-   **AI-Powered Context & Analysis:** Every signal can be expanded to show a detailed, AI-generated summary. This context explains the reasoning behind the signal by analyzing recent news, market sentiment, and price action.
-   **Advanced Search:** Users can search for any stock or cryptocurrency ticker (e.g., `AAPL`, `BTC-USD`) to get an immediate, on-demand AI analysis, which includes a signal and a confidence score.
-   **Push Notifications:** Users can opt-in to receive real-time push notifications for new trading signals directly on their desktop or mobile devices, ensuring they never miss an opportunity. This is powered by Firebase Cloud Messaging.
-   **Mobile-Friendly Access:** A "Connect to Phone" feature generates a QR code, allowing users to seamlessly open the application on their mobile devices.
-   **Modern, Responsive UI/UX:** Built with ShadCN UI and Tailwind CSS, the interface is clean, intuitive, and works flawlessly across all devices.

---

## Technical Architecture & Tech Stack

The project is built with a modern, scalable, and performant tech stack.

-   **Framework:** **[Next.js](https://nextjs.org/)** (using the App Router)
-   **Language:** **[TypeScript](https://www.typescriptlang.org/)**
-   **Styling:** **[Tailwind CSS](https://tailwindcss.com/)** & **[ShadCN UI](https://ui.shadcn.com/)** for a component-based, utility-first design system.
-   **Generative AI:** **[Google AI & Genkit](https://firebase.google.com/docs/genkit)** are used for the core intelligence. Genkit orchestrates calls to the Google Gemini model to generate signals, summaries, and confidence scores.
-   **Push Notifications:** **[Firebase Cloud Messaging (FCM)](https://firebase.google.com/docs/cloud-messaging)** handles the delivery of real-time alerts.
-   **Financial Data Sources:**
    -   **[Alpha Vantage API](https://www.alphavantage.co/)** for real-time and historical stock data.
    -   **[Crypto.com API](https://crypto.com/exchange-api)** for real-time cryptocurrency price data.
-   **Deployment:** The application is configured for seamless deployment on platforms like **[Netlify](https://www.netlify.com/)** or **[Vercel](https://vercel.com/)**.

---

## Getting Started & Local Setup

To run this project on your local machine, follow these steps.

### 1. Clone the Repository
Clone your GitHub repository to your local machine:
```bash
git clone <your-github-repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
Install the required npm packages using npm:
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root of your project. This file is crucial for storing your secret API keys. Add the following keys with their respective values:

```.env
# Get your API key from https://www.alphavantage.co/
FINANCIAL_DATA_API_KEY=YOUR_ALPHA_VANTAGE_API_KEY

# Get your API key from https://crypto.com/exchange/settings/api-keys
CRYPTO_COM_API_KEY=YOUR_CRYPTO_COM_API_KEY
```
You will also need to configure your `src/lib/firebase.ts` file with your own Firebase project credentials if you wish to use a different Firebase project.

### 4. Run the Development Server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running locally.

---
## Author & Contribution

This project was built by **Sheraz Hussain**.

-   **Portfolio:** [sherazhussain546.github.io/portfolio/](https://sherazhussain546.github.io/portfolio/)
-   **GitHub:** [@sherazhussain546](https://github.com/sherazhussain546)

Feel free to reach out with any questions or collaboration inquiries.
