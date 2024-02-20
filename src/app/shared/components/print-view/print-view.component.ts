import { Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver, ApplicationRef, Injector, AfterViewInit } from '@angular/core';
import { CdkPortal, DomPortalHost } from '@angular/cdk/portal';

@Component({
	selector: 'app-print-view',
	templateUrl: './print-view.component.html',
	styleUrls: ['./print-view.component.scss']
})
export class PrintViewComponent implements OnInit, AfterViewInit, OnDestroy {

	// STEP 1: get a reference to the portal
	@ViewChild(CdkPortal) portal: CdkPortal;

	// STEP 2: save a reference to the window so we can close it
	private externalWindow = null;
	private host: DomPortalHost;

	constructor(private componentFactoryResolver: ComponentFactoryResolver,
		private applicationRef: ApplicationRef,
		private injector: Injector) { }

	ngOnInit() {
	}

	ngAfterViewInit(): void {
		// STEP 4: create an external window
		this.externalWindow = window.open('', '', 'width=50,height=50');

		// STEP 5: create a PortalHost with the body of the new window document    
		this.host = new DomPortalHost(
			this.externalWindow.document.body,
			this.componentFactoryResolver,
			this.applicationRef,
			this.injector
		);

		// STEP 6: Attach the portal
		this.host.attach(this.portal);

		let scr = this.externalWindow.document.createElement("script");
		scr.innerHTML = "window.print(); setTimeout(() => { document.getElementById('closePrintView').click(); }, 100);";
		this.externalWindow.document.head.appendChild(scr);
	}

	ngOnDestroy() {
		// STEP 7: close the window when this component destroyed
		this.externalWindow.close();

		if (this.host.hasAttached()) {
			this.host.detach();
		}

		this.host.dispose();
	}

}
