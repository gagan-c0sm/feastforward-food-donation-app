import { MongoClient } from 'mongodb';

// Ensure MONGODB_URI is available in the environment
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.example or Netlify environment variables');
}

// In development mode, we want to preserve the MongoClient instance across HMR (Hot Module Replacement) reloads.
// In production mode, it's best to not preserve the MongoClient instance across serverless function invocations to avoid memory leaks,
// but for simple apps, a cached connection is perfectly fine and standard practice for serverless MongoDB.
let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Parse the connection string to get the database name
  // The database name is usually at the end of the URI, e.g., mongodb+srv://...?retryWrites=true&w=majority
  const client = new MongoClient(uri as string);

  await client.connect();
  
  // Use 'feastforward' as the default db name if none is provided in the URI
  const dbName = uri?.split('/').pop()?.split('?')[0] || 'feastforward';
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
