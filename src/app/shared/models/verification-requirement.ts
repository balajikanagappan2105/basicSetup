import { EventBenefitVerification } from './event-benefit-verification.model';
import { Document } from './document';
import { ObjectState } from './object-state';
import { EmployeeQuestionnaire } from './employee-questionnaire';

export interface VerificationRequirement {
  Id: number;
  EventBenefitVerificationId: number;
  ClientDocumentId: number;
  HasAlternateDocument: boolean;
  Status: string;
  SurveyId: number;
  CapturedEventDate: Date;
  EventBenefitVerification: EventBenefitVerification;
  ClientDocument: Document;
  EmployeeQuestionnaire: EmployeeQuestionnaire[];
  ObjectState: ObjectState;
}
