import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { getAuthUser } from './utils/auth';

export const handler: Handler = async (event) => {
  const user = await getAuthUser(event);
  if (!user) return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };

  const { db } = await connectToDatabase();

  if (event.httpMethod === 'GET') {
    try {
      const requests = await db.collection('foodRequests').find().sort({ _id: -1 }).toArray();
      const mappedRequests = requests.map(r => ({ ...r, id: r._id.toString(), _id: undefined }));
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mappedRequests),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  if (event.httpMethod === 'POST') {
    if (user.role !== 'receiver') {
      return { statusCode: 403, body: JSON.stringify({ error: 'Only receivers can request food' }) };
    }

    try {
      const data = JSON.parse(event.body || '{}');
      
      const newRequest = {
        userId: user.id,
        organization: data.organization,
        location: data.location,
        peopleCount: parseInt(data.peopleCount) || 0,
        requestedDate: data.requestedDate,
        timeSlot: data.timeSlot,
        dietaryReqs: data.dietaryReqs,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const result = await db.collection('foodRequests').insertOne(newRequest);
      
      return {
        statusCode: 201,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newRequest, id: result.insertedId.toString() }),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
