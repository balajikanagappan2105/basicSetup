export interface IEmailView {
	Id: number;
	EmailType: string;
	FromAddress: string;
	FromDisplayName: string;
	ToAddress: string;
	ToDisplayName: string;
	SentDate: Date;
	Subject: string;
	HtmlBody: string;
}
