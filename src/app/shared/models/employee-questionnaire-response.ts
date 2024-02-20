import { EmployeeQuestionnaire } from './employee-questionnaire';
import { SurveyItem } from './survey-item';
import { ObjectState } from './object-state';

export interface EmployeeQuestionnaireResponse {
  Id: number;
  EmployeeQuestionnaireId: number;
  QuestionId: number;
  Answer: string;
  EmployeeQuestionnaire: EmployeeQuestionnaire;
  Question: SurveyItem;
  ObjectState: ObjectState;
}
