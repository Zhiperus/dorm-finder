// @ts-nocheck
import { parseClientResponse } from '$lib/utils/api';
import type { ApiMutation, ApiQuery } from '$lib/utils/types';
import { TanstackRequestOptions } from '../request-options';
import type {
    GenerateOccupancyReport,
    GenerateWaitlistReport,
    GenerateStudentHistoryReport,
    GenerateRevenueReport,
    GenerateUnpaidFeesReport,
    GenerateCustomReport
} from './types';

export class ReportsModule extends TanstackRequestOptions {
    namespace = 'reports';

    generateOccupancyReport(): ApiQuery<GenerateOccupancyReport> {
        return {
            queryKey: [this.namespace, 'occupancy'],
            queryFn: async () => await this.api.reports.occupancy.$get().then(parseClientResponse)
        };
    }

    generateWaitlistReport(): ApiQuery<GenerateWaitlistReport> {
        return {
            queryKey: [this.namespace, 'waitlist'],
            queryFn: async () => await this.api.reports.waitlist.$get().then(parseClientResponse)
        };
    }

    generateStudentHistoryReport(): ApiMutation<GenerateStudentHistoryReport> {
        return {
            mutationFn: async (data) =>
                await this.api.reports['student-history'].$post(data).then(parseClientResponse)
        };
    }

    generateRevenueReport(): ApiQuery<GenerateRevenueReport> {
        return {
            queryKey: [this.namespace, 'revenue'],
            queryFn: async () => await this.api.reports.revenue.$get().then(parseClientResponse)
        };
    }

    generateUnpaidFeesReport(): ApiQuery<GenerateUnpaidFeesReport> {
        return {
            queryKey: [this.namespace, 'unpaid-fees'],
            queryFn: async () =>
                await this.api.reports['unpaid-fees'].$get().then(parseClientResponse)
        };
    }

    generateCustomReport(): ApiMutation<GenerateCustomReport> {
        return {
            mutationFn: async (data) =>
                await this.api.reports.custom.$post(data).then(parseClientResponse)
        };
    }
}
