import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodtruckFormComponent } from './foodtruck-form.component';

describe('FoodtruckFormComponent', () => {
  let component: FoodtruckFormComponent;
  let fixture: ComponentFixture<FoodtruckFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodtruckFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodtruckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
