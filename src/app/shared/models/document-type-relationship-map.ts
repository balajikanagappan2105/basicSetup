import { ObjectState } from './object-state';

export interface DocumentTypeRelationshipMap {
  Id: number;
  DocumentTypeId: number;
  Relationship: string;
  DocumentType: DocumentType;
  ObjectState: ObjectState;
}
