import type { Request, Response } from 'express';
import { db } from '@/server/db/client';
import { appointments } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { getAuth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: req.headers as unknown as Headers });
    if (!session) return res.status(401).json({ error: 'Unauthorized' });
    const role = (session.user as { role?: string }).role;
    if (role !== 'admin' && role !== 'barber') return res.status(403).json({ error: 'Forbidden' });

    const id = parseInt(String(req.params.id));
    const { status, notes, date, time } = req.body;
    await db.update(appointments).set({ status, notes, date, time }).where(eq(appointments.id, id));
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update appointment', message: String(err) });
  }
}
