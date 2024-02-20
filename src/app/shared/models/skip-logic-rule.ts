import { SurveyItem } from './survey-item';
import { OperatorType } from './operator-type';
import { Survey } from './survey';
import { ObjectState } from './object-state';

export interface SkipLogicRule {
  Id: number;
  ValidAnswer: string;
  NextQuestionId: number;
  QuestionId: number;
  OperatorTypeId: number;
  SurveyId: number;
  Status: string;
  IsEndOfQuestionnaire: boolean;
  Question: SurveyItem;
  OperatorType: OperatorType;
  NextQuestion: SurveyItem;
  Survey: Survey;
  ObjectState: ObjectState;
}
