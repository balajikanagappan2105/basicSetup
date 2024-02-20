export interface JWTInfoModel {
	jwtFullToken: any;
	jwtHeader: any;
	jwtPayload: any;
	jwtSignature: string;
	userLastActivityOn?: Date;
	idpStateToken: string;
}
