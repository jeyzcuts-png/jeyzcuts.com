import type { Request, Response } from 'express';
import { db } from '@/server/db/client';
import { gallery } from '@/server/db/schema';
import { getAuth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: req.headers as unknown as Headers });
    if (!session || (session.user as { role?: string }).role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { imageUrl, caption, category } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'imageUrl required' });
    await db.insert(gallery).values({ imageUrl, caption, category: category ?? 'general', uploadedBy: session.user.id });
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add gallery image', message: String(err) });
  }
}
