import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { getAuthUser } from './utils/auth';

export const handler: Handler = async (event) => {
  const user = await getAuthUser(event);
  if (!user) return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };

  const { db } = await connectToDatabase();

  if (event.httpMethod === 'GET') {
    try {
      const reviews = await db.collection('reviews').find().sort({ _id: -1 }).toArray();
      const mappedReviews = reviews.map(r => ({ ...r, id: r._id.toString(), _id: undefined }));
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mappedReviews),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  if (event.httpMethod === 'POST') {
    if (user.role !== 'receiver') {
      return { statusCode: 403, body: JSON.stringify({ error: 'Only receivers can post reviews' }) };
    }

    try {
      const data = JSON.parse(event.body || '{}');
      
      const newReview = {
        donorName: data.donor,
        reviewerId: user.id,
        reviewerName: user.name, // Real app would look up user profile details
        trust: data.trust,
        quality: data.quality,
        convenience: data.convenience,
        comment: data.comment,
        likes: 0,
        featured: false,
        createdAt: new Date().toISOString(),
      };

      const result = await db.collection('reviews').insertOne(newReview);
      
      return {
        statusCode: 201,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newReview, id: result.insertedId.toString() }),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
