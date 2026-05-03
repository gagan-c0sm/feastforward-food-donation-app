import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { getAuthUser } from './utils/auth';

export const handler: Handler = async (event) => {
  const user = await getAuthUser(event);
  if (!user) return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };

  const { db } = await connectToDatabase();

  try {
    let stats = [];

    if (user.role === 'donor') {
      const postsCount = await db.collection('foodPosts').countDocuments({ userId: user.id });
      stats = [
        { label: "Food Donated",   value: `${postsCount * 15}kg`,  icon: "Package",       color: "var(--primary)",      bg: "var(--green-50)" },
        { label: "People Served",  value: `${postsCount * 40}`,  icon: "Users",         color: "var(--primary-dark)", bg: "var(--green-50)" },
        { label: "Active Posts",   value: `${postsCount}`,      icon: "Store",         color: "var(--accent)",       bg: "var(--gold-100)" },
      ];
    } else if (user.role === 'receiver') {
      const requestsCount = await db.collection('foodRequests').countDocuments({ userId: user.id });
      stats = [
        { label: "Active Requests", value: `${requestsCount}`,     icon: "Users",         color: "var(--primary)",      bg: "var(--green-50)" },
        { label: "Received (MTD)",  value: "120kg", icon: "Package",       color: "var(--primary-dark)", bg: "var(--green-50)" },
        { label: "Matches Found",   value: "18",    icon: "Heart",         color: "var(--accent)",       bg: "var(--gold-100)" },
      ];
    } else if (user.role === 'volunteer') {
      const transportsCount = await db.collection('transports').countDocuments({ volunteerId: user.id });
      stats = [
        { label: "Deliveries",        value: `${transportsCount}`,   icon: "CheckCircle2", color: "var(--primary)",      bg: "var(--green-50)" },
        { label: "Distance",          value: "86km", icon: "MapPin",       color: "var(--primary-dark)", bg: "var(--green-50)" },
        { label: "Time Contributed",  value: "32h",  icon: "Clock",        color: "var(--accent)",       bg: "var(--gold-100)" },
      ];
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stats),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};
