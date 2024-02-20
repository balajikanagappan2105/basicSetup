import { ObjectState } from './object-state';

export interface RemovedReason {
  Id: number;
  Reason: string;
  ObjectState: ObjectState;
}
