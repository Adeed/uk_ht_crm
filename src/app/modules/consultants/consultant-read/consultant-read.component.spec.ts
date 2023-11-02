import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantReadComponent } from './consultant-read.component';

describe('ConsultantReadComponent', () => {
  let component: ConsultantReadComponent;
  let fixture: ComponentFixture<ConsultantReadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultantReadComponent]
    });
    fixture = TestBed.createComponent(ConsultantReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
