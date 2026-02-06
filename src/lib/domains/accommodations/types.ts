// @ts-nocheck
import type { Api } from '$lib/utils/types';

export type ListAccommodations = Api['accommodations']['$get'];
export type GetAccommodation = Api['accommodations'][':id']['$get'];
export type CreateAccommodation = Api['accommodations']['$post'];
export type UpdateAccommodation = Api['accommodations'][':id']['$patch'];
export type DeleteAccommodation = Api['accommodations'][':id']['$delete'];
