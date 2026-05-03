import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { getAuthUser } from './utils/auth';

export const handler: Handler = async (event) => {
  const user = await getAuthUser(event);
  if (!user) return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };

  const { db } = await connectToDatabase();

  if (event.httpMethod === 'GET') {
    try {
      const transports = await db.collection('transports').find().sort({ _id: -1 }).toArray();
      const mappedTransports = transports.map(t => ({ ...t, id: t._id.toString(), _id: undefined }));
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mappedTransports),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  if (event.httpMethod === 'POST') {
    // Only donors/receivers might create a transport request, or it's auto-generated upon match
    try {
      const data = JSON.parse(event.body || '{}');
      
      const newTransport = {
        pickupName: data.pickupName,
        pickupLocation: data.pickupLocation,
        dropoffName: data.dropoffName,
        dropoffLocation: data.dropoffLocation,
        foodType: data.foodType,
        quantity: data.quantity,
        timeWindow: data.timeWindow,
        distance: data.distance || 'Unknown',
        status: 'available', // available, assigned, in-transit, completed
        volunteerId: null,
        createdAt: new Date().toISOString(),
      };

      const result = await db.collection('transports').insertOne(newTransport);
      
      return {
        statusCode: 201,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTransport, id: result.insertedId.toString() }),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
