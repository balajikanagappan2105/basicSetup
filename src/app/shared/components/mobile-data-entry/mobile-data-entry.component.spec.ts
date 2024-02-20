import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDataEntryComponent } from './mobile-data-entry.component';

describe('MobileDataEntryComponent', () => {
  let component: MobileDataEntryComponent;
  let fixture: ComponentFixture<MobileDataEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDataEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
