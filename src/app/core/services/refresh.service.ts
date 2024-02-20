import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RefreshService {

  public refreshSection = new Subject();
  refreshSubscriber = this.refreshSection.asObservable();

  constructor() { }

  refresh(status: string) {
    this.refreshSection.next(status);
  }

}
