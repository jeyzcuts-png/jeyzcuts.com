import type { Request, Response } from 'express';
import { db } from '@/server/db/client';
import { services } from '@/server/db/schema';
import { eq, asc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const rows = await db
      .select()
      .from(services)
      .where(eq(services.active, true))
      .orderBy(asc(services.order));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services', message: String(err) });
  }
}
