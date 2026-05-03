import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { verifyPassword, signToken } from './utils/auth';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, password } = JSON.parse(event.body || '{}');

    if (!email || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing email or password' }) };
    }

    const { db } = await connectToDatabase();
    
    const user = await db.collection('users').findOne({ email: email.toLowerCase() });
    if (!user) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
    }

    const userId = user._id.toString();
    const token = signToken(userId, user.role);

    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        user: { ...userWithoutPassword, id: userId },
      }),
    };
  } catch (error) {
    console.error('Login error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};
