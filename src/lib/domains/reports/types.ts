// @ts-nocheck
import type { Api } from '$lib/utils/types';

export type GenerateOccupancyReport = Api['reports']['occupancy']['$get'];
export type GenerateWaitlistReport = Api['reports']['waitlist']['$get'];
export type GenerateStudentHistoryReport = Api['reports']['student-history']['$get'];
export type GenerateRevenueReport = Api['reports']['revenue']['$get'];
export type GenerateUnpaidFeesReport = Api['reports']['unpaid-fees']['$get'];
export type GenerateCustomReport = Api['reports']['custom']['$get'];
