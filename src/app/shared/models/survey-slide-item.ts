import { SurveySlide } from './survey-slide';
import { SurveyItem } from './survey-item';
import { ObjectState } from './object-state';

export interface SurveySlideItem {
  Id: number;
  SurveySlideId: number;
  SurveyItemId: number;
  Index: number;
  SurveySlide: SurveySlide;
  SurveyItem: SurveyItem;
  ObjectState: ObjectState;
}
