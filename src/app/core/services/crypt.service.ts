import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CryptService {

	private _cryptSecretKey: string;

	constructor() {
		this._cryptSecretKey = environment.cryptSecretKey;
	}

	getEncrypted(value: string) {
		var key = CryptoJS.enc.Hex.parse(this._cryptSecretKey);
		var iv = CryptoJS.enc.Hex.parse(this._cryptSecretKey);
		var encrypted = CryptoJS.AES.encrypt(value, key, { iv: iv });
		return encrypted.toString();
	}

	getDecrypted(value: string) {
		var key = CryptoJS.enc.Hex.parse(this._cryptSecretKey);
		var iv = CryptoJS.enc.Hex.parse(this._cryptSecretKey);
		var decrypted = CryptoJS.AES.decrypt(value, key, { iv: iv });
		return decrypted.toString(CryptoJS.enc.Utf8);
	}

}
