import { ObjectState } from './object-state';
import { Client } from './client';
import { ClientAuditDeadline } from './client-audit-deadline';

export interface ClientAudit {
  Id: number;
  StartDate: Date;
  EndDate: Date;
  Name: string;
  ClientId: number;
  IsAuditOver: boolean;
  RunLetters: boolean;
  EnableIvac: boolean;
  EnableiVACUploadDocuments: boolean;
  EnableIris: boolean;
  CanGoGreen: boolean;
  IsGeneral: boolean;
  IvacStartDate: Date;
  IvacEndDate: Date;
  IrisStartDate: Date;
  IrisEndDate: Date;
  UploadDocumentsStartDate: Date;
  UploadDocumentsEndDate: Date;
  ObjectState: ObjectState;
  Client: Client;
  ClientAuditDeadlineS: ClientAuditDeadline[];
}
