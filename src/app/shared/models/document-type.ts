import { ObjectState } from './object-state';
import { DocumentTypeRelationshipMap } from './document-type-relationship-map';

export interface DocumentType {
  Id: number;
  Name: string;
  Category: string;
  ObjectState: ObjectState;
  DocumentTypeRelationshipMaps: DocumentTypeRelationshipMap[];
}
