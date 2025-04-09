# Chat Application with AIMLAPI Integration

A simple chat application built with Next.js that integrates with AIMLAPI for AI-powered conversations.

## Features

- Real-time chat interface
- AI-powered responses using AIMLAPI
- Chat history storage in CSV format
- Modern and responsive UI

## Prerequisites

- Node.js 18+ installed
- AIMLAPI account and API key

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your AIMLAPI key:
```
AIMLAPI_KEY=your_api_key_here
```

## AIMLAPI Integration

This project uses [AIMLAPI](https://aimlapi.com/app/) for AI chat functionality. To get started:

1. Sign up for an account at [AIMLAPI](https://aimlapi.com/app/)
2. Generate your API key from the dashboard
3. Add the API key to your `.env.local` file

### API Configuration

The application uses the following AIMLAPI endpoints:
- Chat completions: `https://api.aimlapi.com/v1/chat/completions`
- Model: `gpt-3.5-turbo`

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Data Collection

The application automatically saves chat history to `data/chat_history.csv` with the following format:
- question: User's input
- answer: AI's response
- timestamp: Time of the conversation

This data can be used for:
- Training custom models
- Analyzing common questions
- Improving response quality

## Project Structure

```
chat-app/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts    # API route handler
│   └── page.tsx            # Main chat interface
├── data/
│   └── chat_history.csv    # Chat history storage
├── public/
├── .env.local             # Environment variables
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [AIMLAPI](https://aimlapi.com/app/) for providing the AI chat API
- Next.js team for the amazing framework
