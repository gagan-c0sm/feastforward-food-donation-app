import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { getAuthUser } from './utils/auth';

export const handler: Handler = async (event) => {
  const user = await getAuthUser(event);
  if (!user) return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };

  const { db } = await connectToDatabase();

  if (event.httpMethod === 'GET') {
    try {
      // Find contracts related to the current user (donor or receiver)
      const query = user.role === 'donor' ? { donorId: user.id } : { receiverId: user.id };
      
      const contracts = await db.collection('contracts').find(query).sort({ _id: -1 }).toArray();
      const mappedContracts = contracts.map(c => ({ ...c, id: c._id.toString(), _id: undefined }));
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mappedContracts),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body || '{}');
      
      const newContract = {
        donorId: user.role === 'donor' ? user.id : data.donorId,
        receiverId: user.role === 'receiver' ? user.id : data.receiverId,
        donorName: data.donorName,
        receiverName: data.receiverName,
        frequency: data.frequency,
        foodType: data.foodType,
        estimatedQuantity: data.estimatedQuantity,
        startDate: data.startDate,
        endDate: data.endDate,
        status: 'active',
        deliveriesCompleted: 0,
        totalDeliveries: data.totalDeliveries || 0,
        createdAt: new Date().toISOString(),
      };

      const result = await db.collection('contracts').insertOne(newContract);
      
      return {
        statusCode: 201,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newContract, id: result.insertedId.toString() }),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
