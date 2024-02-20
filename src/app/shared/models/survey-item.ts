import { ObjectState } from './object-state';
import { SurveyItemType } from './survey-item-type';
import { Survey } from './survey';
import { Client } from './client';
import { SurveyQuestionnaire } from './survey-questionnaire';
import { SkipLogicRule } from './skip-logic-rule';

export interface SurveyItem {
  Id: number;
  Verbiage: string;
  SurveyItemTypeId: number;
  ClientId: number;
  SurveyId: number;
  ObjectState: ObjectState;
  SurveyItemType: SurveyItemType;
  Survey: Survey;
  Client: Client;
  SurveyQuestionnaire: SurveyQuestionnaire[];
  SkipLogicRules: SkipLogicRule[];
}
