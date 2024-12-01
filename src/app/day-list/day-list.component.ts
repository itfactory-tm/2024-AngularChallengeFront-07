import { Component, HostListener } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { Day } from '../interfaces/day';
import { DayService } from '../services/day.service';
import { TicketsComponent } from '../tickets/tickets.component';
import { TicketService } from '../services/ticket.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-day-list',
  standalone: true,
  imports: [TicketsComponent, CommonModule],
  templateUrl: './day-list.component.html',
  styleUrl: './day-list.component.css',
})
export class DayListComponent {
  days$: Observable<Day[]> = new Observable<Day[]>();
  tickets$: Observable<Ticket[]> = new Observable<Ticket[]>();


  ticketsByDag: { [key: number]: Ticket[] } = {};

  isSticky: boolean = false;

  constructor(
    private dayService: DayService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.days$ = this.dayService.getDays();
    this.tickets$ = this.ticketService.getTickets();

    // this.days$.forEach((day) => {
    //   this.ticketsByDag[day.dayId] = this.tickets.filter(
    //     (ticket) => ticket.dayId === day.dayId
    //   );
    // });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const stickyTrigger = 200; // Pixels from the top where the sticky behavior starts
    const scrollPosition =
      window.pageXOffset || document.documentElement.scrollTop;

    this.isSticky = scrollPosition > stickyTrigger;
  }
}
