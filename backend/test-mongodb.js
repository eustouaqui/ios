// Test MongoDB connection using native driver
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoURI = process.env.MONGODB_URI;

console.log('Testing MongoDB connection...');

if (!mongoURI) {
  console.error('❌ MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Check if the placeholder URL is still being used
if (mongoURI.includes('YOUR_CLUSTER_URL_HERE')) {
  console.error('❌ Error: You need to replace "YOUR_CLUSTER_URL_HERE" in your .env file with your actual MongoDB Atlas cluster URL');
  console.error('Please check the MONGODB_CONNECTION_GUIDE.md for instructions');
  process.exit(1);
}

console.log('Using MongoDB URI:', mongoURI.replace(/\/\/(.*):(.*)@/, '//****:****@'));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
    
    // Test creating a simple document
    const db = client.db("mindreprogramming");
    const testCollection = db.collection('test');
    
    const testDoc = { test: 'Connection test', timestamp: new Date() };
    const result = await testCollection.insertOne(testDoc);
    console.log('✅ Test document saved successfully:', testDoc.test);
    
    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('✅ Test document cleaned up');
    
    console.log('✅ MongoDB connection test completed successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('Please check your MongoDB Atlas connection string and network access');
    console.error('Ensure your IP address is whitelisted in MongoDB Atlas Network Access settings');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);