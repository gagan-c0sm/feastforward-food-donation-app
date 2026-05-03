import { Handler } from '@netlify/functions';
import { getAuthUser } from './utils/auth';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const user = await getAuthUser(event);
    
    if (!user) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
    };
  } catch (error) {
    console.error('Auth-me error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};
