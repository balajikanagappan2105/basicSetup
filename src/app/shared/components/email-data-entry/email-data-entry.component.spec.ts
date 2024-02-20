import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDataEntryComponent } from './email-data-entry.component';

describe('EmailDataEntryComponent', () => {
  let component: EmailDataEntryComponent;
  let fixture: ComponentFixture<EmailDataEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailDataEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
