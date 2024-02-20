import { Client } from './client';
import { ObjectState } from './object-state';
import { SurveyType } from './survey-type';
import { SurveySlide } from './survey-slide';

export interface Survey {
  Id: number;
  Name: string;
  ClientId: number;
  Description: string;
  AffidavitTypeId: number;
  IsActive: boolean;
  SurveyTypeId: number;
  Client: Client;
  SurveySlides: SurveySlide[];
  SurveyType: SurveyType;
  ObjectState: ObjectState;
}
