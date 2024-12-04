import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotFormComponent } from './time-slot-form.component';

describe('TimeSlotFormComponent', () => {
  let component: TimeSlotFormComponent;
  let fixture: ComponentFixture<TimeSlotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSlotFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSlotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
