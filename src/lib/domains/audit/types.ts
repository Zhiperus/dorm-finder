// @ts-nocheck
import type { Api } from '$lib/utils/types';

export type ListAuditLogs = Api['audit']['$get'];
export type GetAuditLog = Api['audit'][':id']['$get'];
export type ExportAuditLogs = Api['audit']['export']['$get'];
export type GetUserAuditTrail = Api['audit']['user'][':userId']['$get'];
export type GetEntityAuditTrail = Api['audit']['entity'][':entityType'][':entityId']['$get'];
