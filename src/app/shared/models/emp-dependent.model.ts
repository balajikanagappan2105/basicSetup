import { EventBenefitVerification } from './event-benefit-verification.model';
import { DependentClientAuditData } from './dependent-client-audit-data';
import { ObjectState } from './object-state';
import { RemovedReason } from './removed-reason';
import { EmployeeTask } from './employee-task';

export interface EmpDependent {
  Id: number;
  EmployeeId: number;
  Ssn: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Suffix: string;
  DateOfBirth: Date;
  Gender: string;
  RelationToEmployee: string;
  DependentSqNbr: string;
  IsTermed: boolean;
  IsDisabled: boolean;
  Criteria1: string;
  Criteria2: string;
  Criteria3: string;
  Criteria4: string;
  Criteria5: string;
  Criteria6: string;
  Criteria7: string;
  Criteria8: string;
  Criteria9: string;
  Criteria10: string;
  RemovedReasonId: number;
  EventBenefitVerifications: EventBenefitVerification[];
  DependentClientAuditData: DependentClientAuditData[];
  ObjectState: ObjectState;
  RemovedReason: RemovedReason;
  EmployeeTasks: EmployeeTask[];
}
