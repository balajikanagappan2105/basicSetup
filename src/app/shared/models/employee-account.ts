import { EventType } from './event-type';
import { BenefitType } from './benefit-type';
import { Employee } from './employee.model';
import { ClientAudit } from './client-audit';
import { DependentType } from './dependent-type';
import { EscalationCode } from './escalation-code';
import { EmployeeEscalation } from './employee-escalation';
import { Auditor } from './auditor';
import { IneligibleCode } from './ineligible-code';
import { Client } from './client';

export interface EmployeeAccount {
  EventTypes: EventType[];
  DocumentType: DocumentType[];
  BenefitTypes: BenefitType[];
  Employee: Employee;
  ClientAudits: ClientAudit[];
  ClientDocuments: Document[];
  DependentTypes: DependentType[];
  EscalationCodes: EscalationCode[];
  EmployeeEscalations: EmployeeEscalation[];
  Auditors: Auditor[];
  IneligibleCodes: IneligibleCode[];
  Client: Client;
}
