import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { getAuthUser } from './utils/auth';
import { ObjectId } from 'mongodb';

export const handler: Handler = async (event) => {
  const user = await getAuthUser(event);
  if (!user) return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };

  const id = event.queryStringParameters?.id;
  if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'Missing ID' }) };

  const { db } = await connectToDatabase();

  if (event.httpMethod === 'PUT') {
    try {
      const data = JSON.parse(event.body || '{}');
      
      const result = await db.collection('transports').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: 'after' }
      );

      if (!result) {
         return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result, id: result._id.toString(), _id: undefined }),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  if (event.httpMethod === 'DELETE') {
    try {
      await db.collection('transports').deleteOne({ _id: new ObjectId(id) });
      return { statusCode: 204, body: '' };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
