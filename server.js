const express = require('express');
const cors = require('cors');
const { query } = require('./database');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Get database schema information
app.get('/api/schema', async (req, res) => {
  try {
    const tables = await query('SHOW TABLES');
    const schema = {};

    for (const table of tables) {
      const tableName = Object.values(table)[0];
      const columns = await query(`DESCRIBE ${tableName}`);
      schema[tableName] = columns;
    }

    res.json(schema);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all data from a specific table
app.get('/api/data/:table', async (req, res) => {
  try {
    const tableName = req.params.table;

    // Basic validation to prevent SQL injection
    const validTables = ['participants', 'meetings', 'meeting_participants',
                        'discussion_points', 'questions', 'action_items',
                        'products', 'meeting_products'];

    if (!validTables.includes(tableName)) {
      return res.status(400).json({ error: 'Invalid table name' });
    }

    const data = await query(`SELECT * FROM ${tableName}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ChatGPT integration endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Get current database schema and actual data for context
    const schema = await getSchemaContext();
    const actualData = await getAllData();

    const systemPrompt = `You are a helpful assistant that answers questions about a user interviews database with ACTUAL DATA.

Database Schema:
${schema}

ACTUAL CURRENT DATA:
${actualData}

IMPORTANT: Use the actual data provided above to answer questions. Do NOT suggest SQL queries. Provide direct answers with specific numbers, names, and insights from the actual data. Be conversational and insightful, not technical.

For example:
- If asked "How many meetings?", answer "There are 4 meetings in the database."
- If asked about participants, mention their actual names and roles.
- If asked about pain points, summarize the actual discussion points.
- Provide specific insights and summaries based on the real data.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ],
      max_tokens: 500
    });

    res.json({
      question,
      answer: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('ChatGPT API error:', error);
    res.status(500).json({ error: 'Failed to get response from ChatGPT' });
  }
});

// Helper function to get schema context
async function getSchemaContext() {
  try {
    const tables = await query('SHOW TABLES');
    let schemaInfo = '';

    for (const table of tables) {
      const tableName = Object.values(table)[0];
      const columns = await query(`DESCRIBE ${tableName}`);
      schemaInfo += `\nTable: ${tableName}\n`;
      columns.forEach(col => {
        schemaInfo += `  - ${col.Field}: ${col.Type}\n`;
      });
    }

    return schemaInfo;
  } catch (error) {
    return 'Schema information unavailable';
  }
}

// Helper function to get all relevant data
async function getAllData() {
  try {
    let allData = '';

    // Get all participants
    const participants = await query('SELECT * FROM participants');
    allData += `\nPARTICIPANTS (${participants.length} total):\n${JSON.stringify(participants, null, 2)}\n`;

    // Get all meetings
    const meetings = await query('SELECT * FROM meetings');
    allData += `\nMEETINGS (${meetings.length} total):\n${JSON.stringify(meetings, null, 2)}\n`;

    // Get all discussion points
    const discussionPoints = await query('SELECT * FROM discussion_points');
    allData += `\nDISCUSSION POINTS (${discussionPoints.length} total):\n${JSON.stringify(discussionPoints, null, 2)}\n`;

    // Get all questions
    const questions = await query('SELECT * FROM questions');
    allData += `\nQUESTIONS (${questions.length} total):\n${JSON.stringify(questions, null, 2)}\n`;

    // Get all action items
    const actionItems = await query('SELECT * FROM action_items');
    allData += `\nACTION ITEMS (${actionItems.length} total):\n${JSON.stringify(actionItems, null, 2)}\n`;

    // Get all products
    const products = await query('SELECT * FROM products');
    allData += `\nPRODUCTS (${products.length} total):\n${JSON.stringify(products, null, 2)}\n`;

    // Get meeting participants relationships
    const meetingParticipants = await query('SELECT * FROM meeting_participants');
    allData += `\nMEETING PARTICIPANTS (${meetingParticipants.length} total):\n${JSON.stringify(meetingParticipants, null, 2)}\n`;

    // Get meeting products relationships
    const meetingProducts = await query('SELECT * FROM meeting_products');
    allData += `\nMEETING PRODUCTS (${meetingProducts.length} total):\n${JSON.stringify(meetingProducts, null, 2)}\n`;

    return allData;
  } catch (error) {
    return 'Data unavailable';
  }
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});