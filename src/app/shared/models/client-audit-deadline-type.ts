import { ObjectState } from './object-state';

export interface ClientAuditDeadlineType {
  Id: number;
  Name: string;
  ObjectState: ObjectState;
}
