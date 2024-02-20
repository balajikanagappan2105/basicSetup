import { ObjectState } from './object-state';
import { Survey } from './survey';
import { SurveySlideItem } from './survey-slide-item';

export interface SurveySlide {
  Id: number;
  SurveyId: number;
  Index: number;
  ObjectState: ObjectState;
  Survey: Survey;
  SurveySlideItems: SurveySlideItem[];
}
