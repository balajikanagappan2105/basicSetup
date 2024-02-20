import { ObjectState } from './object-state';
import { Employee } from './employee.model';
import { EmpDependent } from './emp-dependent.model';
import { EscalationCode } from './escalation-code';
import { ClientAudit } from './client-audit';

export interface EmployeeEscalation {
  Id: number;
  EmployeeId: number;
  DependentId: number;
  EscalationCodeId: number;
  ClientAuditId: number;
  ObjectState: ObjectState;
  Employee: Employee;
  Dependent: EmpDependent;
  EscalationCode: EscalationCode;
  ClientAudit: ClientAudit;
  CreatedBy: number;
  CreatedDate: Date;
}
