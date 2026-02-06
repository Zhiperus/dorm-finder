// @ts-nocheck
import type { Api } from '$lib/utils/types';

export type ListRooms = Api['rooms']['$get'];
export type GetRoom = Api['rooms'][':id']['$get'];
export type CreateRoom = Api['rooms']['$post'];
export type UpdateRoom = Api['rooms'][':id']['$patch'];
export type DeleteRoom = Api['rooms'][':id']['$delete'];
