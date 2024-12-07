import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketReturnPageComponent } from './ticket-return-page.component';

describe('TicketReturnPageComponent', () => {
  let component: TicketReturnPageComponent;
  let fixture: ComponentFixture<TicketReturnPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketReturnPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketReturnPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
