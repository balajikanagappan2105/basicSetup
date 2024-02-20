import { EmpDependent } from './emp-dependent.model';
import { VerificationRequirement } from './verification-requirement';
import { ObjectState } from './object-state';
import { EmployeeTask } from './employee-task';

export interface EventBenefitVerification {
  Id: number;
  DependentId: number;
  ClientAuditId: number;
  EmployeeId: number;
  EventTypeId: number;
  ClientEventTypeId: number;
  EventCode: string;
  EventDate: Date;
  BenefitTypeId: number;
  Status: string;
  DisplayStatus: string;
  IsIneligible: boolean;
  IneligibleCodeId: number;
  IneligibleDate: Date;
  IsActive: boolean;
  IsRemovedFromAudit: boolean;
  IsLocked: boolean;
  Dependent: EmpDependent;
  VerificationRequirements: VerificationRequirement[];
  //EventBenefitCustomStatusVerbiages: any[];
  ObjectState: ObjectState;
  EmployeeTasks: EmployeeTask[];
  SelfDeclaredReasonId: number;
  EventRuleId?: number;
}
