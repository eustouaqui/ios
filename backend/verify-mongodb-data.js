// Script to verify MongoDB data
// This is a template - you'll need to update with your actual MongoDB connection string

console.log('📝 MongoDB Data Verification Script');
console.log('=====================================');
console.log('');
console.log('To verify data in MongoDB Atlas:');
console.log('');
console.log('1. Log in to MongoDB Atlas at https://cloud.mongodb.com');
console.log('2. Navigate to your cluster');
console.log('3. Click "Connect" then "Compass"');
console.log('4. Copy the connection string');
console.log('5. Open MongoDB Compass');
console.log('6. Paste the connection string and connect');
console.log('7. Browse the "mindreprogramming" database');
console.log('8. Check the following collections:');
console.log('   - users: Should contain registered users');
console.log('   - affirmations: Should contain saved affirmations');
console.log('');
console.log('Expected data structure:');
console.log('');
console.log('Users collection:');
console.log('{');
console.log('  "_id": "ObjectId(...)",');
console.log('  "email": "test@example.com",');
console.log('  "name": "Test User",');
console.log('  "createdAt": "ISODate(...)"');
console.log('}');
console.log('');
console.log('Affirmations collection:');
console.log('{');
console.log('  "_id": "ObjectId(...)",');
console.log('  "userId": "user-id-from-registration",');
console.log('  "text": "Affirmation text",');
console.log('  "category": "confidence",');
console.log('  "createdAt": "ISODate(...)"');
console.log('}');
console.log('');
console.log('✅ If you see data in these collections, the data persistence is working correctly.');