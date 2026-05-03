import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HandlerEvent } from '@netlify/functions';
import { connectToDatabase } from './db';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(userId: string, role: string): string {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getAuthUser(event: HandlerEvent) {
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded || !decoded.userId) {
    return null;
  }

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
    
    if (!user) return null;
    
    // Return user without password hash
    const { passwordHash, ...safeUser } = user;
    return { ...safeUser, id: user._id.toString() };
  } catch (err) {
    return null;
  }
}
