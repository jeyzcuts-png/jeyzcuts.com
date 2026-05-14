import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
  boolean,
  decimal,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';

// ─── AUTH TABLES (BetterAuth) ────────────────────────────────────────────────

export const user = mysqlTable('user', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').default(false),
  image: text('image'),
  role: mysqlEnum('role', ['admin', 'barber', 'client']).default('client'),
  phone: varchar('phone', { length: 20 }),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const session = mysqlTable('session', {
  id: varchar('id', { length: 36 }).primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const account = mysqlTable('account', {
  id: varchar('id', { length: 36 }).primaryKey(),
  accountId: varchar('account_id', { length: 255 }).notNull(),
  providerId: varchar('provider_id', { length: 255 }).notNull(),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: varchar('password', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const verification = mysqlTable('verification', {
  id: varchar('id', { length: 36 }).primaryKey(),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// ─── SERVICES ────────────────────────────────────────────────────────────────

export const services = mysqlTable('services', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  duration: int('duration').default(30), // minutes
  imageUrl: text('image_url'),
  active: boolean('active').default(true),
  order: int('order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// ─── APPOINTMENTS ─────────────────────────────────────────────────────────────

export const appointments = mysqlTable('appointments', {
  id: int('id').primaryKey().autoincrement(),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientEmail: varchar('client_email', { length: 255 }).notNull(),
  clientPhone: varchar('client_phone', { length: 20 }).notNull(),
  serviceId: int('service_id').references(() => services.id),
  barberId: varchar('barber_id', { length: 36 }).references(() => user.id),
  userId: varchar('user_id', { length: 36 }).references(() => user.id),
  date: varchar('date', { length: 20 }).notNull(), // YYYY-MM-DD
  time: varchar('time', { length: 10 }).notNull(), // HH:MM
  notes: text('notes'),
  status: mysqlEnum('status', ['pending', 'confirmed', 'completed', 'cancelled']).default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export const products = mysqlTable('products', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  stock: int('stock').default(0),
  imageUrl: text('image_url'),
  category: mysqlEnum('category', ['barberia', 'drip', 'accesorios']).default('barberia'),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// ─── GALLERY ──────────────────────────────────────────────────────────────────

export const gallery = mysqlTable('gallery', {
  id: int('id').primaryKey().autoincrement(),
  imageUrl: text('image_url').notNull(),
  caption: varchar('caption', { length: 255 }),
  category: varchar('category', { length: 100 }).default('general'),
  uploadedBy: varchar('uploaded_by', { length: 36 }).references(() => user.id),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// ─── REVIEWS ──────────────────────────────────────────────────────────────────

export const reviews = mysqlTable('reviews', {
  id: int('id').primaryKey().autoincrement(),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientEmail: varchar('client_email', { length: 255 }),
  rating: int('rating').notNull(), // 1-5
  text: text('text').notNull(),
  approved: boolean('approved').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});
