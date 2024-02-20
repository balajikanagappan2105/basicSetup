import {Injectable} from "@angular/core";
import { chatbotScripts } from "../../shared/store/scripts.store";
import { environment } from "src/environments/environment";

declare var document: any;

@Injectable({ providedIn: 'root' })
export class ScriptService {

	private scripts: any = {};

	constructor() {
		var env = '';
		if(environment.production){
			env = "Prod"
		}
		else
		{
			env = "UAT"
		}
		chatbotScripts.forEach((script: any) => {
			if(script.environment == env){
				this.scripts[script.name] = {
					loaded: false,
					src: script.src,
					widgetId : script.widgetId
				};
			}
		});
	}

	load(...scripts: string[]) {
		var promises: any[] = [];
		scripts.forEach((script) => promises.push(this.loadScript(script)));
		return Promise.all(promises);
	}

	loadScript(name: string) {
		return new Promise((resolve, reject) => {
			//resolve if already loaded
			if (this.scripts[name].loaded) {

				resolve({script: name, loaded: true, status: 'Already Loaded'});
			}
			else {
				//load script
				const element = document.getElementById('chatbot');
				if(element){
					element.parentElement.removeChild(element);
					const el = document.getElementById('freshchat-js-sdk');
					el.parentElement.removeChild(el);

					window["fcWidget"].destroy();
				}

				let script = document.createElement('script');
				script.id = 'chatbot';
				script.type = 'text/javascript';
				script.src = this.scripts[name].src;
				script.setAttribute('chat','true');
				script.setAttribute('widgetId',this.scripts[name].widgetId);

				if (script.readyState) {  //IE
					script.onreadystatechange = () => {
						if (script.readyState === "loaded" || script.readyState === "complete") {
							script.onreadystatechange = null;
							this.scripts[name].loaded = true;
							resolve({script: name, loaded: true, status: 'Loaded'});
						}
					};
				} else {  //Others

					script.onload = () => {
						this.scripts[name].loaded = true;
						resolve({script: name, loaded: true, status: 'Loaded'});
					};

				}
				script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
				document.getElementsByTagName('head')[0].appendChild(script);
			}
		});
	}

}
