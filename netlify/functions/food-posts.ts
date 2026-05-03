import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { getAuthUser } from './utils/auth';

export const handler: Handler = async (event) => {
  const user = await getAuthUser(event);
  if (!user) return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };

  const { db } = await connectToDatabase();

  if (event.httpMethod === 'GET') {
    try {
      // Get all food posts, maybe sorted by newest first
      const posts = await db.collection('foodPosts').find().sort({ _id: -1 }).toArray();
      // Map _id to id for the frontend
      const mappedPosts = posts.map(p => ({ ...p, id: p._id.toString(), _id: undefined }));
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mappedPosts),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  if (event.httpMethod === 'POST') {
    if (user.role !== 'donor') {
      return { statusCode: 403, body: JSON.stringify({ error: 'Only donors can post food' }) };
    }

    try {
      const data = JSON.parse(event.body || '{}');
      
      const newPost = {
        userId: user.id,
        restaurant: data.restaurant,
        foodType: data.foodType,
        quantity: data.quantity,
        availableUntil: data.availableUntil,
        pickupTime: data.pickupTime,
        location: data.location,
        description: data.description,
        status: 'available',
        createdAt: new Date().toISOString(),
      };

      const result = await db.collection('foodPosts').insertOne(newPost);
      
      return {
        statusCode: 201,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newPost, id: result.insertedId.toString() }),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
