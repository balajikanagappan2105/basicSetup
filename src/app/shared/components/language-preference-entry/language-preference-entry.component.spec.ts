import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagePreferenceEntryComponent } from './language-preference-entry.component';

describe('LanguagePreferenceEntryComponent', () => {
  let component: LanguagePreferenceEntryComponent;
  let fixture: ComponentFixture<LanguagePreferenceEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagePreferenceEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagePreferenceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
