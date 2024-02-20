import { ObjectState } from './object-state';

export interface DependentType {
  Id: number;
  Name: string;
  Abbreviation: string;
  ObjectState: ObjectState;
}
