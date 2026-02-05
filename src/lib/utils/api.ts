import type { ApiRoutes } from '$lib/server';
import type { ClientRequestOptions } from 'hono';
import { hc, type ClientResponse } from 'hono/client';

export const honoClient = (options?: ClientRequestOptions) => hc<ApiRoutes>('/', options).api;

export class ApiError extends Error {
    constructor(
        public message: string,
        public status: number,
        public data?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function parseClientResponse<T>(response: ClientResponse<T>) {
    if (response.ok) {
        return response.json() as T;
    }

    const status = response.status;
    const text = await response.text();

    try {
        const jsonError = JSON.parse(text);
        const message = jsonError.message || jsonError.error || 'API Error';

        throw new ApiError(message, status, jsonError);
    } catch (e) {
        if (e instanceof ApiError) throw e;
        throw new ApiError(text || 'Unknown API Error', status);
    }
}
