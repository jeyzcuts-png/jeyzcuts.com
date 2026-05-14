import type { Request, Response } from 'express';
import { db } from '@/server/db/client';
import { products } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const rows = await db.select().from(products).where(eq(products.active, true));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', message: String(err) });
  }
}
