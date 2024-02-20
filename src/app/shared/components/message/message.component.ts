import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

	@Input() visible: boolean;
	@Input() showIcon: boolean;
	@Input() message: string;
	@Input() messageType: string;
	@Input() header: string;
	@Input() styleClass: string;
	@Input() buttonStyleClass: string;
	@Output() onClose = new EventEmitter();

	constructor() { }

	ngOnInit() {
		this.styleClass = this.styleClass || 'z-index-3';
		this.buttonStyleClass = this.buttonStyleClass || 'btn-primary btn-block';
		this.styleClass = this.styleClass + ' no-footer';
	}

	onModalMessageClose() {
		this.onClose.emit();
	}

}
