import { ObjectState } from './object-state';

export interface Auditor {
  Id: number;
  FirstName: string;
  LastName: string;
  UserName: string;
  Password: string;
  PhoneNumber: string;
  PhoneExtension: string;
  Email: string;
  WorkLocation: string;
  Department: string;
  CanReceiveTasks: boolean;
  CanReceiveQRTasks: boolean;
  CanReceiveEscalatedTasks: boolean;
  EnableDistribution: boolean;
  RandomPercentage: number;
  IncompletePercentage: number;
  IneligiblePercentage: number;
  SVExceptionPercentage: number;
  IsActive: boolean;
  VerifyCode: number;
  IsManager: boolean;
  ManagerId: number;
  ObjectState: ObjectState;
  Manager: Auditor;
}
