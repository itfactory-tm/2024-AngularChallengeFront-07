import { Component } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { Day } from '../day';
import { DayService } from '../day.service';
import { TicketsComponent } from '../tickets/tickets.component';
import { TicketService } from '../services/ticket.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-day-list',
  standalone: true,
  imports: [TicketsComponent, CommonModule],
  templateUrl: './day-list.component.html',
  styleUrl: './day-list.component.css'
})
export class DayListComponent {

  dagen: Day[] = [];
  tickets : Ticket[] = [];

  ticketsByDag: { [key: number]: Ticket[] } = {};

  constructor(private dayService: DayService, private ticketService: TicketService){}

  ngOnInit(): void {
    this.dagen = this.dayService.getDays();
    this.tickets = this.ticketService.getTickets();

    this.dagen.forEach(dag => {
      this.ticketsByDag[dag.dayId] = this.tickets.filter(ticket => ticket.dagId === dag.dayId);
    });

  }

}
