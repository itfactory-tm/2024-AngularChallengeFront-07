import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodtruckListComponent } from './foodtruck-list.component';

describe('FoodtruckListComponent', () => {
  let component: FoodtruckListComponent;
  let fixture: ComponentFixture<FoodtruckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodtruckListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodtruckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
