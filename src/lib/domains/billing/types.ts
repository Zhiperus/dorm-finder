// @ts-nocheck
import type { Api } from '$lib/utils/types';

export type ListBillingRecords = Api['billing']['$get'];
export type GetBillingRecord = Api['billing'][':id']['$get'];
export type CreateBillingRecord = Api['billing']['$post'];
export type UpdateBillingRecord = Api['billing'][':id']['$patch'];
export type DeleteBillingRecord = Api['billing'][':id']['$delete'];

export type ListPayments = Api['billing'][':id']['payments']['$get'];
export type CreatePayment = Api['billing'][':id']['payments']['$post'];
export type GetPayment = Api['billing'][':id']['payments'][':paymentId']['$get'];

export type GetBillingSummary = Api['billing']['summary']['$get'];
export type GetStudentBillingHistory = Api['billing']['student'][':studentId']['$get'];
