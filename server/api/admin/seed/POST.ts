/**
 * POST /api/admin/seed
 * One-time seed: creates the admin user if it doesn't exist.
 * Protected by a seed token to prevent abuse.
 */
import type { Request, Response } from 'express';
import { db } from '@/server/db/client';
import { user } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { getAuth } from '@/lib/auth/auth';
import { getSecret } from '#airo/secrets';

export default async function handler(req: Request, res: Response) {
  try {
    // Simple protection: require a token in the body
    const { email, password, name, token } = req.body;
    const expectedToken = getSecret('BETTER_AUTH_SECRET');
    if (!token || token !== (typeof expectedToken === 'string' ? expectedToken.slice(0, 16) : '')) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'email, password, name required' });
    }

    // Check if user already exists
    const existing = await db.select().from(user).where(eq(user.email, email)).limit(1);
    if (existing.length > 0) {
      // Just update role to admin
      const { id } = existing[0];
      await db.update(user).set({ role: 'admin' }).where(eq(user.id, id));
      return res.json({ ok: true, message: 'User already exists — role updated to admin' });
    }

    // Create via BetterAuth
    const auth = getAuth();
    const result = await auth.api.signUpEmail({
      body: { email, password, name },
    });

    if (!result || !('user' in result)) {
      return res.status(500).json({ error: 'Failed to create user' });
    }

    // Update role to admin
    await db.update(user).set({ role: 'admin' }).where(eq(user.email, email));

    res.status(201).json({ ok: true, message: 'Admin user created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Seed failed', message: String(err) });
  }
}
