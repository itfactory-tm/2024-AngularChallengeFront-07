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
  quantity: number = 1;

  constructor(private ticketTypeService: TicketTypeService) {}

  ngOnInit(): void {
    this.ticketType = this.ticketTypeService.getTicketTypeById(this.ticket.typeId);
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
