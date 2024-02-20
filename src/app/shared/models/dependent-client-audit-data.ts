import { ObjectState } from './object-state';
import { DependentType } from './dependent-type';
import { EmpDependent } from './emp-dependent.model';
import { ClientAudit } from './client-audit';

export interface DependentClientAuditData {
  Id: number;
  DependentId: number;
  ClientAuditId: number;
  HasMedical: boolean;
  MedicalPlan: string;
  HasDental: boolean;
  DentalPlan: string;
  HasVision: boolean;
  VisionPlan: string;
  HasLifePlan: boolean;
  LifePlan: string;
  HasADPlan: boolean;
  ADPlan: string;
  CapturedSSN: string;
  CapturedDateOfBirth: Date;
  DependentTypeId: number;
  ObjectState: ObjectState;
  Dependent: EmpDependent;
  ClientAudit: ClientAudit;
  DependentType: DependentType;
}
