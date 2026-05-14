import type { Request, Response } from 'express';
import { db } from '@/server/db/client';
import { gallery } from '@/server/db/schema';
import { eq, desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const rows = await db.select().from(gallery).where(eq(gallery.active, true)).orderBy(desc(gallery.createdAt));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery', message: String(err) });
  }
}
