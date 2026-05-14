import type { Request, Response } from 'express';
import { db } from '@/server/db/client';
import { products } from '@/server/db/schema';
import { getAuth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: req.headers as unknown as Headers });
    if (!session || (session.user as { role?: string }).role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { name, description, price, stock, imageUrl, category } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'name and price required' });
    await db.insert(products).values({ name, description, price, stock: stock ?? 0, imageUrl, category: category ?? 'barberia' });
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product', message: String(err) });
  }
}
