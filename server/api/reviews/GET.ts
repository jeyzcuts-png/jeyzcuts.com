import type { Request, Response } from 'express';
import { db } from '@/server/db/client';
import { reviews } from '@/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getAuth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: req.headers as unknown as Headers });
    const role = (session?.user as { role?: string } | undefined)?.role;

    let rows;
    if (role === 'admin') {
      rows = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
    } else {
      rows = await db.select().from(reviews).where(eq(reviews.approved, true)).orderBy(desc(reviews.createdAt));
    }
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews', message: String(err) });
  }
}
