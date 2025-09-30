const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

console.log('Attempting to connect to MongoDB...');

if (!mongoURI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Check if the placeholder URL is still being used
if (mongoURI.includes('YOUR_CLUSTER_URL_HERE')) {
  console.error('❌ Error: You need to replace "YOUR_CLUSTER_URL_HERE" in your .env file with your actual MongoDB Atlas cluster URL');
  console.error('Please check the MONGODB_CONNECTION_GUIDE.md for instructions');
  process.exit(1);
}

console.log('Using MongoDB URI:', mongoURI.replace(/\/\/(.*):(.*)@/, '//****:****@')); // Hide credentials in logs

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
    
    // Set the database reference
    db = client.db("mindreprogramming");
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('Please check your MongoDB Atlas connection string and network access');
    console.error('Ensure your IP address is whitelisted in MongoDB Atlas Network Access settings');
    process.exit(1);
  }
}

// Health check endpoint to prevent Render from sleeping
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// API Health endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    await client.db("admin").command({ ping: 1 });
    res.json({ 
      status: 'OK', 
      environment: process.env.NODE_ENV || 'development',
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Error',
      environment: process.env.NODE_ENV || 'development',
      database: 'Disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// User registration endpoint
app.post('/api/users', async (req, res) => {
  try {
    const { email, name } = req.body;
    const usersCollection = db.collection('users');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const user = { email, name, createdAt: new Date() };
    const result = await usersCollection.insertOne(user);
    
    res.status(201).json({ message: 'User created', user: { ...user, _id: result.insertedId } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user by email
app.get('/api/users/:email', async (req, res) => {
  try {
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email: req.params.email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save affirmation endpoint
app.post('/api/affirmations', async (req, res) => {
  try {
    const affirmationsCollection = db.collection('affirmations');
    const affirmation = { ...req.body, createdAt: new Date() };
    
    const result = await affirmationsCollection.insertOne(affirmation);
    
    res.status(201).json({ message: 'Affirmation saved', affirmation: { ...affirmation, _id: result.insertedId } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get affirmations by user ID
app.get('/api/affirmations/user/:userId', async (req, res) => {
  try {
    const affirmationsCollection = db.collection('affirmations');
    const affirmations = await affirmationsCollection.find({ userId: req.params.userId }).toArray();
    
    res.json(affirmations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🧪 Test the API endpoints:`);
    console.log(`   Health check: http://localhost:${PORT}/health`);
    console.log(`   API health: http://localhost:${PORT}/api/health`);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await client.close();
  process.exit(0);
});