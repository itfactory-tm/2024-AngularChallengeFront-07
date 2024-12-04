import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { TicketType } from '../interfaces/ticketType';
import { TicketTypeService } from '../services/ticketType.service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnInit {
  @Input() ticket!: Ticket;
  ticketType: TicketType | undefined;
  quantity: number = 0;

  constructor(private ticketTypeService: TicketTypeService) { }

  ngOnInit(): void {
    if (this.ticket && this.ticket.ticketTypeId) {
      this.ticketTypeService.getTicketTypeById(this.ticket.ticketTypeId).subscribe({
        next: (ticketType) => {
          this.ticketType = ticketType;
        },
        error: (err) => {
          console.error('Error fetching ticket type', err);
        }
      });
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
}
