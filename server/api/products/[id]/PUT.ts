import type { Request, Response } from 'express';
import { db } from '@/server/db/client';
import { products } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { getAuth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: req.headers as unknown as Headers });
    if (!session || (session.user as { role?: string }).role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const id = parseInt(String(req.params.id));
    const { name, description, price, stock, imageUrl, category, active } = req.body;
    await db.update(products).set({ name, description, price, stock, imageUrl, category, active }).where(eq(products.id, id));
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product', message: String(err) });
  }
}
