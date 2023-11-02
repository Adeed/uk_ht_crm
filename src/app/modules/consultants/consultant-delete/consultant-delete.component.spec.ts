import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantDeleteComponent } from './consultant-delete.component';

describe('ConsultantDeleteComponent', () => {
  let component: ConsultantDeleteComponent;
  let fixture: ComponentFixture<ConsultantDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultantDeleteComponent]
    });
    fixture = TestBed.createComponent(ConsultantDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
