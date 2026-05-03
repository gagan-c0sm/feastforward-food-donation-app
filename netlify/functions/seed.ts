import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { hashPassword } from './utils/auth';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { db } = await connectToDatabase();

    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('foodPosts').deleteMany({});
    await db.collection('foodRequests').deleteMany({});
    await db.collection('transports').deleteMany({});
    await db.collection('contracts').deleteMany({});
    await db.collection('reviews').deleteMany({});

    // Seed Users
    const passwordHash = await hashPassword('password123');
    const users = [
      { email: 'donor@feastforward.com', name: 'The Green Kitchen', role: 'donor', passwordHash, createdAt: new Date().toISOString() },
      { email: 'donor2@feastforward.com', name: 'Pasta Palace', role: 'donor', passwordHash, createdAt: new Date().toISOString() },
      { email: 'receiver@feastforward.com', name: 'Hope Shelter', role: 'receiver', passwordHash, createdAt: new Date().toISOString() },
      { email: 'receiver2@feastforward.com', name: 'Community Center', role: 'receiver', passwordHash, createdAt: new Date().toISOString() },
      { email: 'volunteer@feastforward.com', name: 'Alex Volunteer', role: 'volunteer', passwordHash, createdAt: new Date().toISOString() },
      { email: 'volunteer2@feastforward.com', name: 'Sam Driver', role: 'volunteer', passwordHash, createdAt: new Date().toISOString() },
    ];
    
    const userResult = await db.collection('users').insertMany(users);
    const donorId = userResult.insertedIds[0].toString();
    const donor2Id = userResult.insertedIds[1].toString();
    const receiverId = userResult.insertedIds[2].toString();
    const receiver2Id = userResult.insertedIds[3].toString();
    const volunteerId = userResult.insertedIds[4].toString();

    // Seed Food Posts
    const foodPosts = [
      { userId: donorId, restaurant: "The Green Kitchen", foodType: "Mixed Vegetables & Rice", quantity: "Serves 40-50 people", availableUntil: "2026-05-09", pickupTime: "8:00 PM - 9:00 PM", location: "Downtown, 789 Food St", description: "Fresh vegetable curry with rice, fully vegetarian", status: "available", createdAt: new Date().toISOString() },
      { userId: donorId, restaurant: "City Cafe", foodType: "Sandwiches & Salads", quantity: "Serves 25-30 people", availableUntil: "2026-05-09", pickupTime: "7:00 PM - 8:00 PM", location: "West End, 321 Cafe Lane", description: "Assorted sandwiches and fresh salads", status: "claimed", createdAt: new Date().toISOString() },
      { userId: donor2Id, restaurant: "Pasta Palace", foodType: "Pasta & Bread", quantity: "Serves 35 people", availableUntil: "2026-05-10", pickupTime: "9:00 PM - 10:00 PM", location: "North District, 555 Italian Way", description: "Various pasta dishes with garlic bread", status: "available", createdAt: new Date().toISOString() }
    ];
    await db.collection('foodPosts').insertMany(foodPosts);

    // Seed Food Requests
    const foodRequests = [
      { userId: receiverId, organization: "Hope Shelter", location: "Downtown, 123 Main St", peopleCount: 50, requestedDate: "2026-05-10", timeSlot: "6:00 PM - 8:00 PM", dietaryReqs: "Vegetarian options needed", status: "matched", createdAt: new Date().toISOString() },
      { userId: receiver2Id, organization: "Community Center", location: "East Side, 456 Oak Ave", peopleCount: 30, requestedDate: "2026-05-11", timeSlot: "12:00 PM - 2:00 PM", dietaryReqs: "No restrictions", status: "pending", createdAt: new Date().toISOString() }
    ];
    await db.collection('foodRequests').insertMany(foodRequests);

    // Seed Transports
    const transports = [
      { pickupName: "The Green Kitchen", pickupLocation: "Downtown, 789 Food St", dropoffName: "Hope Shelter", dropoffLocation: "Downtown, 123 Main St", foodType: "Vegetable Curry & Rice", quantity: "15 trays (40-50 servings)", timeWindow: "Today, 8:00 PM - 9:00 PM", distance: "2.4 km", status: "available", volunteerId: null, createdAt: new Date().toISOString() },
      { pickupName: "Pasta Palace", pickupLocation: "North District, 555 Italian Way", dropoffName: "Community Center", dropoffLocation: "East Side, 456 Oak Ave", foodType: "Pasta & Breadsticks", quantity: "10 large trays", timeWindow: "Today, 9:00 PM - 10:00 PM", distance: "5.1 km", status: "in-transit", volunteerId: volunteerId, createdAt: new Date().toISOString() },
      { pickupName: "City Cafe", pickupLocation: "West End, 321 Cafe Lane", dropoffName: "Youth Haven", dropoffLocation: "South District, 987 Safe St", foodType: "Sandwiches & Salads", quantity: "30 individual boxes", timeWindow: "Yesterday, 7:00 PM - 8:00 PM", distance: "3.8 km", status: "completed", volunteerId: volunteerId, createdAt: new Date().toISOString() }
    ];
    await db.collection('transports').insertMany(transports);

    // Seed Contracts
    const contracts = [
      { donorId: donorId, receiverId: receiverId, donorName: "The Green Kitchen", receiverName: "Hope Shelter", frequency: "daily", foodType: "Vegetarian meals", estimatedQuantity: "Serves 50 people", startDate: "2026-03-01", endDate: "2026-06-01", status: "active", deliveriesCompleted: 25, totalDeliveries: 92, createdAt: new Date().toISOString() },
      { donorId: donor2Id, receiverId: receiver2Id, donorName: "Pasta Palace", receiverName: "Community Center", frequency: "weekly", foodType: "Pasta & Breadsticks", estimatedQuantity: "Serves 30 people", startDate: "2026-03-15", endDate: "2026-09-15", status: "active", deliveriesCompleted: 2, totalDeliveries: 26, createdAt: new Date().toISOString() }
    ];
    await db.collection('contracts').insertMany(contracts);

    // Seed Reviews
    const reviews = [
      { donorName: "The Green Kitchen", reviewerId: receiverId, reviewerName: "Hope Shelter", trust: 5, quality: 5, convenience: 4, comment: "Consistently fresh food, always on time! Their vegetarian meals have become a staple for our community.", likes: 24, featured: true, createdAt: "2026-03-25" },
      { donorName: "Pasta Palace", reviewerId: receiver2Id, reviewerName: "Community Center", trust: 4, quality: 5, convenience: 3, comment: "Great pasta, pickup window could be more flexible. But the quality is always top-notch.", likes: 18, featured: false, createdAt: "2026-03-24" },
      { donorName: "City Cafe", reviewerId: receiverId, reviewerName: "Hope Shelter", trust: 5, quality: 4, convenience: 5, comment: "Super convenient location and always accommodating with pickup times. A reliable partner.", likes: 12, featured: false, createdAt: "2026-03-23" },
      { donorName: "The Green Kitchen", reviewerId: receiver2Id, reviewerName: "Community Center", trust: 5, quality: 5, convenience: 5, comment: "Perfect partner. They even adjusted their schedule to match our feeding times.", likes: 31, featured: false, createdAt: "2026-03-22" },
      { donorName: "Pasta Palace", reviewerId: receiverId, reviewerName: "Youth Haven", trust: 4, quality: 4, convenience: 4, comment: "Reliable and consistent. The kids love their breadsticks!", likes: 9, featured: false, createdAt: "2026-03-21" }
    ];
    await db.collection('reviews').insertMany(reviews);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Database seeded successfully' }),
    };
  } catch (error) {
    console.error('Seed error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};
