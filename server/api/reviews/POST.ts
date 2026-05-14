import type { Request, Response } from 'express';
import { db } from '@/server/db/client';
import { reviews } from '@/server/db/schema';

export default async function handler(req: Request, res: Response) {
  try {
    const { clientName, clientEmail, rating, text } = req.body;
    if (!clientName || !rating || !text) return res.status(400).json({ error: 'Missing fields' });
    await db.insert(reviews).values({ clientName, clientEmail, rating: parseInt(rating), text, approved: false });
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit review', message: String(err) });
  }
}
