import { ObjectState } from './object-state';

export interface EventType {
  Id: number;
  Name: string;
  ObjectState: ObjectState;
}
