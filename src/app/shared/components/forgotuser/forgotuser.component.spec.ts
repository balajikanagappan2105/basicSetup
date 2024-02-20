import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotuserComponent } from './forgotuser.component';

describe('ForgotuserComponent', () => {
  let component: ForgotuserComponent;
  let fixture: ComponentFixture<ForgotuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
