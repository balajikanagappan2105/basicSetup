import { JWTInfoModel } from './jwt-info.model';

export interface ILocalStorage {
	preferredLanguage: number;
	jwtInfoModel: JWTInfoModel;
	clientInfo: { id: number, name: string, email: string, serviceRepId: number, logoutUrl: string, tollFreeNumber: string, wikiLink: string, goGreenOptOut:boolean };
	authenticatedToken: string;
	uploadGUID: string;
	enableUploadDocument:boolean;
	enableGoGreen:boolean;
	goGreenCompleted:boolean;
	preferedEmailStatus:boolean;
	preferedEmailId:string;
	resendMailId:number;

}
