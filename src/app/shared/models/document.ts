import { DocumentType } from './document-type';
import { ObjectState } from './object-state';

export interface Document {
  Id: number;
  ClientID: number;
  DocumentTypeId: number;
  AffidavitTypeId: number;
  IsActive: boolean;
  DocumentType: DocumentType;
  ObjectState: ObjectState;
}
