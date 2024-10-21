import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService, private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.tickets = this.ticketService.getTickets();
  }

}
