# Market Genius 🚀

**Live Site:** [https://marketgenius546.netlify.app/](https://marketgenius546.netlify.app/)

Market Genius is an AI-powered financial signal platform that provides real-time trading insights for stocks and cryptocurrencies. It leverages generative AI to analyze market data, news, and sentiment to generate actionable buy, sell, or hold signals.

![Market Genius Screenshot](https://placehold.co/800x400.png)

## ✨ Features

- **Real-Time Signals:** Get continuous, up-to-the-minute trading signals for a variety of assets.
- **AI-Powered Analysis:** Each signal comes with a detailed AI-generated summary, providing context on market sentiment and reasoning.
- **Advanced Search:** Search for any stock or cryptocurrency ticker to get an on-demand analysis, including a signal (buy/sell/hold) and a confidence score.
- **Push Notifications:** Enable browser push notifications to receive real-time alerts for new trading signals, even when the app is in the background.
- **Mobile-Friendly:** Use the "Connect to Phone" feature to generate a QR code for easy access on your mobile device.
- **Modern UI/UX:** A clean, responsive, and intuitive interface built with ShadCN UI and Tailwind CSS.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **AI & Generative AI:** [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **Push Notifications:** [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
- **Data Sources:**
  - [Alpha Vantage API](https://www.alphavantage.co/) for stock data.
  - [Crypto.com API](https://crypto.com/exchange-api) for cryptocurrency data.
- **Deployment:** [Netlify](https://www.netlify.com/)

## ⚙️ Getting Started

To run this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of your project and add your API keys. You can get these keys from their respective platforms.

```.env
FINANCIAL_DATA_API_KEY=YOUR_ALPHA_VANTAGE_API_KEY
CRYPTO_COM_API_KEY=YOUR_CRYPTO_COM_API_KEY
```

You will also need to create a `firebase.ts` config file and add your Firebase project configuration to enable push notifications.

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified in your `dev` script) in your browser to see the application.

## 🧑‍💻 Author

This project was built by **Sheraz Hussain**.

- **Portfolio:** [sherazhussain546.github.io/portfolio/](https://sherazhussain546.github.io/portfolio/)
- **GitHub:** [@sherazhussain546](https://github.com/sherazhussain546)

