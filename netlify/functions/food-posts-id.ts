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
      
      const result = await db.collection('foodPosts').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: 'after' }
      );

      if (!result) {
         // for older mongodb driver versions it might be result.value
         return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
      }

      const updatedDoc = result;
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updatedDoc, id: updatedDoc._id.toString(), _id: undefined }),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  if (event.httpMethod === 'DELETE') {
    if (user.role !== 'donor') {
      return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) };
    }

    try {
      await db.collection('foodPosts').deleteOne({ _id: new ObjectId(id) });
      return { statusCode: 204, body: '' };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
