import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Input() ticketType?: TicketType;
  @Output() quantityChange = new EventEmitter<{ ticketId: string, quantity: number }>();

  quantity: number = 0;

  constructor(private ticketTypeService: TicketTypeService) { }

  ngOnInit(): void {
    // Remove the ticketType fetching here
  }

  increaseQuantity(): void {
    this.quantity++;
    this.quantityChange.emit({ ticketId: this.ticket.ticketId, quantity: this.quantity });
  }

  decreaseQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
      this.quantityChange.emit({ ticketId: this.ticket.ticketId, quantity: this.quantity });
    }
  }
}
