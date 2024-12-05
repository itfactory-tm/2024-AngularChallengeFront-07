import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTicketMailTemplateComponent } from './buy-ticket-mail-template.component';

describe('BuyTicketMailTemplateComponent', () => {
  let component: BuyTicketMailTemplateComponent;
  let fixture: ComponentFixture<BuyTicketMailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyTicketMailTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyTicketMailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
