import { ObjectState } from './object-state';
import { IneligibleCodeType } from './ineligible-code-type';

export interface IneligibleCode {
  Id: number;
  Description: string;
  ClientId: number;
  StandardTemplateVersionId: number;
  IneligibleCodeTypeId: number;
  IsActive: boolean;
  ObjectState: ObjectState;
  IneligibleCodeType: IneligibleCodeType;
}
