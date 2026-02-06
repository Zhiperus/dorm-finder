import { parseClientResponse } from '$lib/utils/api';
import type { ApiMutation, ApiQuery } from '$lib/utils/types';
import { TanstackRequestOptions } from '../request-options';
import type {
    ListBillingRecords,
    GetBillingRecord,
    CreateBillingRecord,
    UpdateBillingRecord,
    DeleteBillingRecord,
    ListPayments,
    CreatePayment,
    GetPayment,
    GetBillingSummary,
    GetStudentBillingHistory
} from './types';

export class BillingModule extends TanstackRequestOptions {
    namespace = 'billing';

    list(): ApiQuery<ListBillingRecords> {
        return {
            queryKey: [this.namespace],
            queryFn: async () => await this.api.billing.$get().then(parseClientResponse)
        };
    }

    get(id: string): ApiQuery<GetBillingRecord> {
        return {
            queryKey: [this.namespace, id],
            queryFn: async () =>
                await this.api.billing[':id'].$get({ param: { id } }).then(parseClientResponse)
        };
    }

    create(): ApiMutation<CreateBillingRecord> {
        return {
            mutationFn: async (data) => await this.api.billing.$post(data).then(parseClientResponse)
        };
    }

    update(): ApiMutation<UpdateBillingRecord> {
        return {
            mutationFn: async (data) =>
                await this.api.billing[':id'].$patch(data).then(parseClientResponse)
        };
    }

    delete(): ApiMutation<DeleteBillingRecord> {
        return {
            mutationFn: async (data) =>
                await this.api.billing[':id'].$delete(data).then(parseClientResponse)
        };
    }

    listPayments(billingId: string): ApiQuery<ListPayments> {
        return {
            queryKey: [this.namespace, billingId, 'payments'],
            queryFn: async () =>
                await this.api.billing[':id'].payments
                    .$get({ param: { id: billingId } })
                    .then(parseClientResponse)
        };
    }

    createPayment(): ApiMutation<CreatePayment> {
        return {
            mutationFn: async (data) =>
                await this.api.billing[':id'].payments.$post(data).then(parseClientResponse)
        };
    }

    getPayment(billingId: string, paymentId: string): ApiQuery<GetPayment> {
        return {
            queryKey: [this.namespace, billingId, 'payments', paymentId],
            queryFn: async () =>
                await this.api.billing[':id'].payments[':paymentId']
                    .$get({ param: { id: billingId, paymentId } })
                    .then(parseClientResponse)
        };
    }

    getSummary(): ApiQuery<GetBillingSummary> {
        return {
            queryKey: [this.namespace, 'summary'],
            queryFn: async () => await this.api.billing.summary.$get().then(parseClientResponse)
        };
    }

    getStudentBillingHistory(studentId: string): ApiQuery<GetStudentBillingHistory> {
        return {
            queryKey: [this.namespace, 'student', studentId],
            queryFn: async () =>
                await this.api.billing.student[':studentId']
                    .$get({ param: { studentId } })
                    .then(parseClientResponse)
        };
    }
}
