import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantCreateComponent } from './consultant-create.component';

describe('ConsultantCreateComponent', () => {
  let component: ConsultantCreateComponent;
  let fixture: ComponentFixture<ConsultantCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultantCreateComponent]
    });
    fixture = TestBed.createComponent(ConsultantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
