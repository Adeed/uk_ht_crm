import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantUpdateComponent } from './consultant-update.component';

describe('ConsultantUpdateComponent', () => {
  let component: ConsultantUpdateComponent;
  let fixture: ComponentFixture<ConsultantUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultantUpdateComponent]
    });
    fixture = TestBed.createComponent(ConsultantUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
