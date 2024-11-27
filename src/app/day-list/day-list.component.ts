import { Component, HostListener  } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { Dag } from '../interfaces/dag';
import { DagService } from '../services/dag.service';
import { TicketsComponent } from '../tickets/tickets.component';
import { TicketService } from '../services/ticket.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-day-list',
  standalone: true,
  imports: [TicketsComponent, CommonModule, RouterModule],
  templateUrl: './day-list.component.html',
  styleUrl: './day-list.component.css'
})
export class DayListComponent {

  dagen: Dag[] = [];
  tickets : Ticket[] = [];

  ticketsByDag: { [key: number]: Ticket[] } = {};

  isSticky: boolean = false;

  constructor(private dagService: DagService, private ticketService: TicketService){}

  ngOnInit(): void {
    this.dagen = this.dagService.getDays();
    this.tickets = this.ticketService.getTickets();

    this.dagen.forEach(dag => {
      this.ticketsByDag[dag.dagId] = this.tickets.filter(ticket => ticket.dagId === dag.dagId);
    });

  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const stickyTrigger = 200; // Pixels from the top where the sticky behavior starts
    const scrollPosition = window.pageXOffset || document.documentElement.scrollTop;

    this.isSticky = scrollPosition > stickyTrigger;
  }


}
