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

// Enhanced MongoDB connection options to handle SSL/TLS issues on Render
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // SSL/TLS options
  tls: true,
  // Connection timeout options
  connectTimeoutMS: 30000,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  // Retry options
  retryWrites: true,
  retryReads: true,
  // Additional options to handle connection issues
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 30000,
  waitQueueTimeoutMS: 10000,
  // Server options
  directConnection: false,
  // Read preference
  readPreference: 'primary'
});

let db;

async function connectToDatabase() {
  try {
    console.log('Connecting to MongoDB with enhanced options...');
    
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
    console.error('🔧 SOLUTION: Ensure your IP address is whitelisted in MongoDB Atlas Network Access settings');
    console.error('📘 Instructions:');
    console.error('   1. Log in to MongoDB Atlas at https://cloud.mongodb.com');
    console.error('   2. Go to "Network Access" in the left sidebar');
    console.error('   3. Click "Add IP Address"');
    console.error('   4. Select "Allow Access from Anywhere" (0.0.0.0/0)');
    console.error('   5. Click "Confirm"');
    console.error('Error details:', error);
    
    // Try alternative connection method
    console.log('Attempting alternative connection method...');
    return await connectWithAlternativeOptions();
  }
}

// Alternative connection method with different options
async function connectWithAlternativeOptions() {
  try {
    console.log('Trying alternative connection options...');
    
    // Close existing client if it exists
    if (client) {
      await client.close();
    }
    
    // Create new client with alternative options
    const alternativeClient = new MongoClient(mongoURI, {
      tls: true,
      connectTimeoutMS: 15000,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 30000,
      retryWrites: true,
      maxPoolSize: 5,
      minPoolSize: 1
    });
    
    // Connect with alternative client
    await alternativeClient.connect();
    await alternativeClient.db("admin").command({ ping: 1 });
    console.log("✅ Alternative connection successful!");
    
    // Update global client and db references
    global.client = alternativeClient;
    db = alternativeClient.db("mindreprogramming");
    
    return db;
  } catch (error) {
    console.error('❌ Alternative connection also failed:', error.message);
    console.error('🔧 CRITICAL: Your IP address is NOT whitelisted in MongoDB Atlas');
    console.error('📘 Follow these steps to fix this issue:');
    console.error('   1. Log in to MongoDB Atlas at https://cloud.mongodb.com');
    console.error('   2. Go to "Network Access" in the left sidebar');
    console.error('   3. Add these specific Render IP addresses to MongoDB Atlas Network Access:');
    console.error('      - 44.229.227.142');
    console.error('      - 54.188.71.94');
    console.error('      - 52.13.128.108');
    console.error('      - 74.220.48.0/24');
    console.error('      - 74.220.56.0/24');
    console.error('   4. For each IP address:');
    console.error('      - Click "Add IP Address"');
    console.error('      - Click "Add Another IP Address" for additional addresses');
    console.error('      - Enter the IP address');
    console.error('      - Add a comment like "Render Outbound IP" for reference');
    console.error('      - Click "Confirm"');
    console.error('   5. For development only, you can temporarily use "Allow Access from Anywhere" (0.0.0.0/0)');
    console.error('   6. Wait a few minutes for changes to propagate');
    console.error('Error details:', error);
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
    const testClient = new MongoClient(mongoURI, {
      tls: true,
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      retryWrites: true
    });
    
    await testClient.connect();
    await testClient.db("admin").command({ ping: 1 });
    await testClient.close();
    
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
      database: 'Disconnected - Check MongoDB Atlas Network Access',
      error: error.message,
      solution: 'Add Render IP addresses to MongoDB Atlas Network Access',
      renderIPs: [
        '44.229.227.142',
        '54.188.71.94',
        '52.13.128.108',
        '74.220.48.0/24',
        '74.220.56.0/24'
      ],
      detailedSteps: [
        '1. Log in to MongoDB Atlas at https://cloud.mongodb.com',
        '2. Go to "Network Access" in the left sidebar',
        '3. Click "Add IP Address"',
        '4. Add each of the Render IP addresses listed above',
        '5. Or for development only: Add 0.0.0.0/0 to MongoDB Atlas Network Access'
      ],
      timestamp: new Date().toISOString()
    });
  }
});

// User registration endpoint
app.post('/api/users', async (req, res) => {
  try {
    if (!db) {
      throw new Error('Database not connected - Check MongoDB Atlas Network Access. Get Render outbound IP addresses from Render Dashboard and add to MongoDB Atlas Network Access.');
    }
    
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
    console.error('User creation error:', error);
    res.status(400).json({ 
      error: error.message,
      solution: 'Check MongoDB Atlas Network Access settings',
      renderIPs: [
        '44.229.227.142',
        '54.188.71.94',
        '52.13.128.108',
        '74.220.48.0/24',
        '74.220.56.0/24'
      ],
      detailedSteps: [
        '1. Log in to MongoDB Atlas at https://cloud.mongodb.com',
        '2. Go to "Network Access" in the left sidebar',
        '3. Click "Add IP Address"',
        '4. Add each of the Render IP addresses listed above',
        '5. Or for development only: Add 0.0.0.0/0 to MongoDB Atlas Network Access'
      ]
    });
  }
});

// Get user by email
app.get('/api/users/:email', async (req, res) => {
  try {
    if (!db) {
      throw new Error('Database not connected - Check MongoDB Atlas Network Access. Get Render outbound IP addresses from Render Dashboard and add to MongoDB Atlas Network Access.');
    }
    
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email: req.params.email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('User fetch error:', error);
    res.status(500).json({ 
      error: error.message,
      solution: 'Check MongoDB Atlas Network Access settings',
      renderIPs: [
        '44.229.227.142',
        '54.188.71.94',
        '52.13.128.108',
        '74.220.48.0/24',
        '74.220.56.0/24'
      ],
      detailedSteps: [
        '1. Log in to MongoDB Atlas at https://cloud.mongodb.com',
        '2. Go to "Network Access" in the left sidebar',
        '3. Click "Add IP Address"',
        '4. Add each of the Render IP addresses listed above',
        '5. Or for development only: Add 0.0.0.0/0 to MongoDB Atlas Network Access'
      ]
    });
  }
});

// Save affirmation endpoint
app.post('/api/affirmations', async (req, res) => {
  try {
    if (!db) {
      throw new Error('Database not connected - Check MongoDB Atlas Network Access. Get Render outbound IP addresses from Render Dashboard and add to MongoDB Atlas Network Access.');
    }
    
    const affirmationsCollection = db.collection('affirmations');
    const affirmation = { ...req.body, createdAt: new Date() };
    
    const result = await affirmationsCollection.insertOne(affirmation);
    
    res.status(201).json({ message: 'Affirmation saved', affirmation: { ...affirmation, _id: result.insertedId } });
  } catch (error) {
    console.error('Affirmation save error:', error);
    res.status(400).json({ 
      error: error.message,
      solution: 'Check MongoDB Atlas Network Access settings',
      renderIPs: [
        '44.229.227.142',
        '54.188.71.94',
        '52.13.128.108',
        '74.220.48.0/24',
        '74.220.56.0/24'
      ],
      detailedSteps: [
        '1. Log in to MongoDB Atlas at https://cloud.mongodb.com',
        '2. Go to "Network Access" in the left sidebar',
        '3. Click "Add IP Address"',
        '4. Add each of the Render IP addresses listed above',
        '5. Or for development only: Add 0.0.0.0/0 to MongoDB Atlas Network Access'
      ]
    });
  }
});

// Get affirmations by user ID
app.get('/api/affirmations/user/:userId', async (req, res) => {
  try {
    if (!db) {
      throw new Error('Database not connected - Check MongoDB Atlas Network Access. Get Render outbound IP addresses from Render Dashboard and add to MongoDB Atlas Network Access.');
    }
    
    const affirmationsCollection = db.collection('affirmations');
    const affirmations = await affirmationsCollection.find({ userId: req.params.userId }).toArray();
    
    res.json(affirmations);
  } catch (error) {
    console.error('Affirmations fetch error:', error);
    res.status(500).json({ 
      error: error.message,
      solution: 'Check MongoDB Atlas Network Access settings',
      renderIPs: [
        '44.229.227.142',
        '54.188.71.94',
        '52.13.128.108',
        '74.220.48.0/24',
        '74.220.56.0/24'
      ],
      detailedSteps: [
        '1. Log in to MongoDB Atlas at https://cloud.mongodb.com',
        '2. Go to "Network Access" in the left sidebar',
        '3. Click "Add IP Address"',
        '4. Add each of the Render IP addresses listed above',
        '5. Or for development only: Add 0.0.0.0/0 to MongoDB Atlas Network Access'
      ]
    });
  }
});

// Generate binaural audio endpoint
app.post('/api/generate-binaural-audio', async (req, res) => {
  try {
    if (!db) {
      throw new Error('Database not connected - Check MongoDB Atlas Network Access. Get Render outbound IP addresses from Render Dashboard and add to MongoDB Atlas Network Access.');
    }
    
    const { userId, affirmationText, binauralFrequency, voiceType } = req.body;
    
    // Validate input
    if (!userId || !affirmationText) {
      return res.status(400).json({ error: 'userId and affirmationText are required' });
    }
    
    // In a real implementation, this would:
    // 1. Generate text-to-speech audio from the affirmation text
    // 2. Combine it with binaural frequencies
    // 3. Return a secure URL or stream the audio data
    
    // For demonstration, we'll simulate the process
    const audioData = {
      audioId: `audio_${Date.now()}_${userId}`,
      userId: userId,
      affirmationText: affirmationText,
      binauralFrequency: binauralFrequency || '6Hz',
      voiceType: voiceType || 'male',
      createdAt: new Date(),
      // In a real implementation, this would be a secure URL to the audio file
      audioUrl: `/api/audio/${userId}/binaural_6hz_${Date.now()}.wav`,
      duration: 300 // 5 minutes in seconds
    };
    
    // Save audio generation record to database
    const audioCollection = db.collection('audio_files');
    const result = await audioCollection.insertOne(audioData);
    
    // Return success response
    res.status(201).json({
      message: 'Binaural audio generation started',
      audioId: audioData.audioId,
      audioUrl: audioData.audioUrl,
      duration: audioData.duration
    });
    
  } catch (error) {
    console.error('Binaural audio generation error:', error);
    res.status(500).json({ 
      error: error.message,
      solution: 'Check MongoDB Atlas Network Access settings',
      renderIPs: [
        '44.229.227.142',
        '54.188.71.94',
        '52.13.128.108',
        '74.220.48.0/24',
        '74.220.56.0/24'
      ],
      detailedSteps: [
        '1. Log in to MongoDB Atlas at https://cloud.mongodb.com',
        '2. Go to "Network Access" in the left sidebar',
        '3. Click "Add IP Address"',
        '4. Add each of the Render IP addresses listed above',
        '5. Or for development only: Add 0.0.0.0/0 to MongoDB Atlas Network Access'
      ]
    });
  }
});

// Serve audio files endpoint (in a real implementation, this would be more secure)
app.get('/api/audio/:userId/:filename', async (req, res) => {
  try {
    const { userId, filename } = req.params;
    
    // In a real implementation, this would:
    // 1. Verify the user has access to this audio file
    // 2. Stream the audio file from secure storage
    // 3. Ensure the file cannot be accessed by other users
    
    // For demonstration, we'll return a placeholder response
    res.status(200).json({
      message: 'Audio file would be served here',
      userId: userId,
      filename: filename,
      note: 'In a real implementation, this would stream the actual audio file'
    });
    
  } catch (error) {
    console.error('Audio file serving error:', error);
    res.status(500).json({ 
      error: error.message,
      solution: 'Check MongoDB Atlas Network Access settings',
      renderIPs: [
        '44.229.227.142',
        '54.188.71.94',
        '52.13.128.108',
        '74.220.48.0/24',
        '74.220.56.0/24'
      ],
      detailedSteps: [
        '1. Log in to MongoDB Atlas at https://cloud.mongodb.com',
        '2. Go to "Network Access" in the left sidebar',
        '3. Click "Add IP Address"',
        '4. Add each of the Render IP addresses listed above',
        '5. Or for development only: Add 0.0.0.0/0 to MongoDB Atlas Network Access'
      ]
    });
  }
});

const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectToDatabase().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🧪 Test the API endpoints:`);
    console.log(`   Health check: http://localhost:${PORT}/health`);
    console.log(`   API health: http://localhost:${PORT}/api/health`);
    console.log(`📘 IMPORTANT: If MongoDB connection fails, add 0.0.0.0/0 to MongoDB Atlas Network Access`);
  });
  
  // Handle server errors
  server.on('error', (error) => {
    console.error('Server error:', error);
    process.exit(1);
  });
  
  // Handle unhandled rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });
  
  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  try {
    await client.close();
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  try {
    await client.close();
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
  process.exit(0);
});