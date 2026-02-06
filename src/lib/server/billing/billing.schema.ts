import { pgEnum, pgTable, text, timestamp, uuid, integer } from 'drizzle-orm/pg-core';

import { applicationsTable } from '../applications/applications.schema';
import { timestamps } from '../common/utils/drizzle';
import { roomsTable } from '../rooms/rooms.schema';
import { usersTable } from '../users/users.schema';

export const billingTypeEnum = pgEnum('billing_type', [
  'ROOM_FEE',
  'DEPOSIT',
  'UTILITY',
  'MAINTENANCE',
  'PENALTY',
  'REFUND',
  'OTHER'
]);

export const billingStatusEnum = pgEnum('billing_status', [
  'PENDING',
  'PARTIAL',
  'PAID',
  'OVERDUE',
  'CANCELLED',
  'REFUNDED'
]);

export const paymentMethodEnum = pgEnum('payment_method', [
  'CASH',
  'CHECK',
  'CREDIT_CARD',
  'DEBIT_CARD',
  'BANK_TRANSFER',
  'ONLINE_PAYMENT',
  'SCHOLARSHIP',
  'FINANCIAL_AID'
]);

export const billingTable = pgTable('billing', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  studentId: uuid('student_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  applicationId: uuid('application_id').references(() => applicationsTable.id, {
    onDelete: 'set null'
  }),
  roomId: uuid('room_id').references(() => roomsTable.id, { onDelete: 'set null' }),
  type: billingTypeEnum('type').notNull(),
  description: text('description').notNull(),
  amount: integer('amount').notNull(),
  currency: text('currency').default('USD').notNull(),
  dueDate: timestamp('due_date', { mode: 'date' }).notNull(),
  status: billingStatusEnum('status').default('PENDING').notNull(),
  paidAmount: integer('paid_amount').default(0).notNull(),
  paymentMethod: paymentMethodEnum('payment_method'),
  paymentReference: text('payment_reference'),
  paidAt: timestamp('paid_at', { mode: 'date' }),
  processedBy: uuid('processed_by'),
  lateFee: integer('late_fee').default(0),
  notes: text('notes'),
  ...timestamps
});

export type Billing = typeof billingTable.$inferSelect;
export type BillingId = Billing['id'] & { __brand: 'BillingId' };
