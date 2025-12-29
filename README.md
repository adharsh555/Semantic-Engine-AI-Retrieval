# Semantic-Engine-AI-Retrieval

SemanticEngine is a high-performance Retrieval-Augmented Generation (RAG) platform designed to transform static data into interactive, actionable knowledge. By leveraging Google Gemini 1.5 embeddings and PostgreSQL vector similarity, the system provides context-aware answers grounded strictly in user-provided documentation.

## Project Rationale

Traditional keyword-based search systems often fail to capture the intent behind a query. SemanticEngine addresses this by:
- **Understanding Context**: Utilizing 768-dimensional vector embeddings to match semantic meaning rather than literal strings.
- **Ensuring Factuality**: Implementing a RAG architecture that prevents AI hallucinations by forcing responses to be grounded in verified internal data.
- **Providing Transparency**: Automatically generating source citations for every factual claim, allowing for immediate verification.

## Core Features

- **Semantic Search**: Intelligent content retrieval powered by Google Gemini `text-embedding-004`.
- **AI Advisor**: Contextual chat interface using `gemini-1.5-flash` to narrative research findings.
- **Production Hardened**: Integrated rate limiting, centralized error handling, and non-blocking background processing.
- **Premium UI**: Modern dark-themed interface built with React, Tailwind CSS, and Framer Motion.

## Technical Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL with `pgvector` extension.
- **AI/LLM**: Google Generative AI (Gemini API).

## Installation and Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL with `pgvector` extension
- Google Gemini API Key

### Backend Configuration
1. Navigate to the `/backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   PORT=4000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_db_name
   GEMINI_API_KEY=your_api_key
   ```
4. Run the database seed script:
   ```bash
   node seed.js
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Configuration
1. Navigate to the `/frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Future Applications

- **Enterprise Knowledge Base**: Internal AI advisor for HR policies and technical manuals.
- **Legal Research**: Semantic discovery of clauses and precedents across large contract volumes.
- **Customer Support Integration**: Deflecting tickets by providing accurate, cited answers from product documentation.
- **Medical Documentation**: Assisting practitioners in retrieving specific research-backed information from clinical trials.

## Collaboration and Queries

For technical queries, feature requests, or collaboration opportunities, please contact:

**Adhar**  
[Insert your email/portfolio link here]

---

*This project is provided as-is for educational and professional development purposes.*
