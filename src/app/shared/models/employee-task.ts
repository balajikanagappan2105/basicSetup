import { Employee } from './employee.model';
import { EmpDependent } from './emp-dependent.model';
import { Auditor } from './auditor';
import { ObjectState } from './object-state';
import { EventBenefitVerification } from './event-benefit-verification.model';

export interface EmployeeTask {
  Id: number;
  EmployeeId: number;
  TaskTypeId: number;
  EmployeePackageId: number;
  DependentId: number;
  EventBenefitVerificationId: number;
  EventId: number;
  AssignedTo: number;
  IsEscalated: boolean;
  TaskEscalationReasonId: number;
  IsCorrect: boolean;
  IsActive: boolean;
  DueDate: Date;
  CompletedBy: number;
  CompletedDate: Date;
  AssignedDate: Date;
  IsDeescalated: boolean;
  Employee: Employee;
  Dependent: EmpDependent;
  User: Auditor;
  ObjectState: ObjectState;
  EventBenefitVerification: EventBenefitVerification;
}
