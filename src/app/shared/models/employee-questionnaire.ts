import { VerificationRequirement } from './verification-requirement';
import { EmployeeQuestionnaireResponse } from './employee-questionnaire-response';
import { ObjectState } from './object-state';

export interface EmployeeQuestionnaire {
  Id: number;
  RandomSurveyNumber: number;
  VerificationRequirementId: number;
  Status: string;
  IsActive: boolean;
  VerificationRequirement: VerificationRequirement;
  EmployeeQuestionnaireResponse: EmployeeQuestionnaireResponse[];
  ObjectState: ObjectState;
}
