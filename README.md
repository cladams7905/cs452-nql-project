# User Interviews Database with ChatGPT Integration

A Node.js server with MySQL database for managing user interview data, featuring a ChatGPT integration for querying the database using natural language.

## Features

- MySQL database with comprehensive user interview schema
- Express.js REST API
- ChatGPT integration for natural language queries
- Docker containerization
- Pre-loaded sample data
- Simple web interface for testing

## Quick Start with Docker

1. **Set up your OpenAI API key** (required for ChatGPT functionality):
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

2. **Start the application**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Web interface: http://localhost:3000
   - API health check: http://localhost:3000/health

## Manual Setup (without Docker)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up MySQL database**:
   - Install MySQL 8.0
   - Create database: `CREATE DATABASE user_interviews;`
   - Run the schema: `mysql -u root -p user_interviews < user-interviews.sql`

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and OpenAI API key
   ```

4. **Load sample data**:
   ```bash
   node seed-data.js
   ```

5. **Start the server**:
   ```bash
   npm start
   ```

## API Endpoints

### Database Endpoints
- `GET /health` - Health check
- `GET /api/schema` - Get database schema information
- `GET /api/data/:table` - Get all data from a specific table

### ChatGPT Integration
- `POST /api/chat` - Send a question about the database
  ```json
  {
    "question": "How many participants are in the database?"
  }
  ```

## Database Schema

The database includes the following tables:
- `participants` - Interview participants with demographics
- `meetings` - Meeting/interview sessions
- `meeting_participants` - Many-to-many relationship for meeting attendees
- `discussion_points` - Key topics discussed in meetings
- `questions` - Q&A pairs from interviews
- `action_items` - Follow-up tasks and their status
- `products` - Products/tools mentioned in interviews
- `meeting_products` - Products discussed in specific meetings

## Sample Data

The database comes pre-loaded with realistic sample data including:
- 5 participants (Product Managers, Engineers, Designers, etc.)
- 4 meetings (Discovery interviews, demos, reviews)
- Discussion points about analytics, API integration, and UX
- Questions and answers from interviews
- Action items with different statuses
- Product mentions and context

## Example ChatGPT Queries

Try asking questions like:
- "How many meetings have been conducted?"
- "What are the main pain points discussed?"
- "Which participants are from San Francisco?"
- "What action items are still pending?"
- "What products were mentioned in the analytics discussion?"

## Environment Variables

- `DB_HOST` - Database host (default: localhost)
- `DB_USER` - Database username (default: root)
- `DB_PASSWORD` - Database password (default: rootpassword)
- `DB_NAME` - Database name (default: user_interviews)
- `DB_PORT` - Database port (default: 3306)
- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 3000)

## Files Structure

```
├── server.js              # Main Express server
├── database.js            # Database connection utilities
├── seed-data.js           # Sample data generator
├── user-interviews.sql    # Database schema
├── docker-compose.yml     # Docker services configuration
├── Dockerfile            # Node.js app container
├── public/
│   └── index.html        # Simple web interface
└── package.json          # Node.js dependencies
```

## Note

Remember to add your OpenAI API key to the `.env` file for the ChatGPT integration to work. Without it, the `/api/chat` endpoint will return an error.