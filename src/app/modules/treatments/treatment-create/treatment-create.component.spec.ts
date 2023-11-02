import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCreateComponent } from './treatment-create.component';

describe('TreatmentCreateComponent', () => {
  let component: TreatmentCreateComponent;
  let fixture: ComponentFixture<TreatmentCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentCreateComponent]
    });
    fixture = TestBed.createComponent(TreatmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
