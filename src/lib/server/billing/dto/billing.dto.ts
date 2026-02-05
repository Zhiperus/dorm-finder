import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { billingTable } from '../billing.schema';

export const billingDto = createSelectSchema(billingTable);
export const createBillingDto = createInsertSchema(billingTable);
export const updateBillingDto = createSelectSchema(billingTable).partial();

export type BillingDto = typeof billingDto;
export type CreateBillingDto = typeof createBillingDto;
export type UpdateBillingDto = typeof updateBillingDto;
