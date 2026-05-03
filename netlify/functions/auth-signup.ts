import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { hashPassword, signToken } from './utils/auth';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, password, name, role } = JSON.parse(event.body || '{}');

    if (!email || !password || !name || !role) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const { db } = await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return { statusCode: 400, body: JSON.stringify({ error: 'User already exists' }) };
    }

    const passwordHash = await hashPassword(password);
    
    const newUser = {
      email: email.toLowerCase(),
      name,
      role,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    const result = await db.collection('users').insertOne(newUser);
    const userId = result.insertedId.toString();
    
    const token = signToken(userId, role);

    const { passwordHash: _, ...userWithoutPassword } = newUser;

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        user: { ...userWithoutPassword, id: userId },
      }),
    };
  } catch (error) {
    console.error('Signup error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};
