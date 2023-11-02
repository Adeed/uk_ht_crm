import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalQsComponent } from './medical-qs.component';

describe('MedicalQsComponent', () => {
  let component: MedicalQsComponent;
  let fixture: ComponentFixture<MedicalQsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalQsComponent]
    });
    fixture = TestBed.createComponent(MedicalQsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
