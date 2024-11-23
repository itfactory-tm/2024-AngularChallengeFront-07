import { Component } from '@angular/core';
import { Ticket } from '../ticket';
import { Dag } from '../dag';
import { DagService } from '../dag.service';
import { TicketsComponent } from '../tickets/tickets.component';
import { TicketService } from '../ticket.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-day-list',
  standalone: true,
  imports: [TicketsComponent, CommonModule],
  templateUrl: './day-list.component.html',
  styleUrl: './day-list.component.css'
})
export class DayListComponent {

  dagen: Dag[] = [];
  tickets : Ticket[] = [];

  ticketsByDag: { [key: number]: Ticket[] } = {};

  constructor(private dagService: DagService, private ticketService: TicketService){}

  ngOnInit(): void {
    this.dagen = this.dagService.getDays();
    this.tickets = this.ticketService.getTickets();

    this.dagen.forEach(dag => {
      this.ticketsByDag[dag.dagId] = this.tickets.filter(ticket => ticket.dagId === dag.dagId);
    });

  }

}
