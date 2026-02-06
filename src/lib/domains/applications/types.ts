// @ts-nocheck
import type { Api } from '$lib/utils/types';

export type ListApplications = Api['applications']['$get'];
export type GetApplication = Api['applications'][':id']['$get'];
export type CreateApplication = Api['applications']['$post'];
export type UpdateApplication = Api['applications'][':id']['$patch'];
export type DeleteApplication = Api['applications'][':id']['$delete'];

export type ListDocuments = Api['applications'][':id']['documents']['$get'];
export type UploadDocument = Api['applications'][':id']['documents']['$post'];
export type DeleteDocument = Api['applications'][':id']['documents'][':documentId']['$delete'];
