import { ObjectState } from './object-state';
import { ClientAuditDeadlineType } from './client-audit-deadline-type';
import { ClientAudit } from './client-audit';

export interface ClientAuditDeadline {
  Id: number;
  Name: string;
  Deadline: Date;
  ClientAuditDeadlineTypeId: number;
  ClientAuditId: number;
  IsScheduled: boolean;
  ScheduledStartDay: Date;
  ScheduledEndDay: Date;
  HasActionCompleted: boolean;
  ActionCompletedDate: Date;
  NotificationMessage: string;
  Frequency: string;
  RunSunday: boolean;
  RunMonday: boolean;
  RunTuesday: boolean;
  RunWednesday: boolean;
  RunThursday: boolean;
  RunFriday: boolean;
  RunSaturday: boolean;
  ObjectState: ObjectState;
  ClientAuditDeadlineType: ClientAuditDeadlineType;
  ClientAudit: ClientAudit;
}
