// @ts-nocheck
import type { Api } from '$lib/utils/types';

export type ListOccupancyRecords = Api['occupancy']['$get'];
export type GetOccupancyRecord = Api['occupancy'][':id']['$get'];
export type CreateOccupancyRecord = Api['occupancy']['$post'];
export type UpdateOccupancyRecord = Api['occupancy'][':id']['$patch'];
export type DeleteOccupancyRecord = Api['occupancy'][':id']['$delete'];

export type CheckIn = Api['occupancy']['check-in']['$post'];
export type CheckOut = Api['occupancy']['check-out']['$post'];
export type GetStudentOccupancy = Api['occupancy']['student'][':studentId']['$get'];
export type GetRoomOccupancy = Api['occupancy']['room'][':roomId']['$get'];
