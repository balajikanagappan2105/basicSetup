import { ObjectState } from './object-state';

export interface IActivityLog {
	Id: number;
	ApplicationName: string;
	IpAddress: string;
	Region: string;
	BrowserLanguage: string;
	BrowserName: string;
	BrowserVersion: string;
	EmployeeId: string;
	ClientId: number;
	Details: string;
	ActionTypeId: number;
	ObjectState: ObjectState;
}
