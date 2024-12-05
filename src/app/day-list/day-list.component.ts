import { Component, HostListener } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { Day } from '../interfaces/day';
import { DayService } from '../services/day.service';
import { TicketsComponent } from '../tickets/tickets.component';
import { TicketService } from '../services/ticket.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-day-list',
  standalone: true,
  imports: [TicketsComponent, CommonModule, RouterModule],
  templateUrl: './day-list.component.html',
  styleUrl: './day-list.component.css',
})
export class DayListComponent {
  days$: Observable<Day[]> = new Observable<Day[]>();
  tickets$: Observable<Ticket[]> = new Observable<Ticket[]>();
  filteredTicketsMap: Map<string, Observable<Ticket[]>> = new Map();

  resultArray: Ticket[] = [];

  isSticky: boolean = false;
  totalSelectedTickets: number = 0;
  selectedTicketQuantities: Map<string, number> = new Map();

  constructor(private dayService: DayService, private ticketService: TicketService, private router: Router) { }

  ngOnInit(): void {
    this.days$ = this.dayService.getDays();
    this.tickets$ = this.ticketService.getTickets();

    this.days$.subscribe((days: Day[]) => {
      // Populate the map with filtered tickets observables for each dayId
      days.forEach(dag => {
        this.filteredTicketsMap.set(dag.dayId, this.getTicketsByDay(dag.dayId));
      });
    });
  }

  getTicketsByDay(dayId: string): Observable<Ticket[]> {
    return this.tickets$.pipe(
      map(tickets => tickets.filter(ticket => ticket.dayId === dayId))
    );
  }

  // Submit tickets for buying
  addTickets(ticket: Ticket, amount: number): void {
    for (let i = 0; i < amount; i++) {
      console.log(ticket)
      this.resultArray.push(ticket);  // Add the ticket 'amount' times to the result array
    }
  }

  onTicketQuantityChange(event: { ticketId: string, quantity: number }): void {
    if (event.quantity > 0) {
      this.selectedTicketQuantities.set(event.ticketId, event.quantity);
    } else {
      this.selectedTicketQuantities.delete(event.ticketId);
    }
    this.totalSelectedTickets = this.calculateTotalTickets();
  }

  calculateTotalTickets(): number {
    let total = 0;
    this.selectedTicketQuantities.forEach(qty => {
      total += qty;
    });
    return total;
  }

  submitTickets(): void {
    if (this.totalSelectedTickets === 0) {
      alert('Please select at least one ticket before proceeding.');
      return;
    }

    this.resultArray = []; // Reset result array

    this.selectedTicketQuantities.forEach((quantity, ticketId) => {
      // Find the ticket by ticketId
      this.tickets$.subscribe((tickets: Ticket[]) => {
        const ticket = tickets.find(t => t.ticketId === ticketId);
        if (ticket) {
          this.addTickets(ticket, quantity);
        }
      });
    });

    this.ticketService.setSelectedTickets(this.resultArray); // Display the selected tickets
    this.router.navigate(['/order-ticket']); // Routing to the next page for entering the names
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const stickyTrigger = 200; // Pixels from the top where the sticky behavior starts
    const scrollPosition =
      window.pageXOffset || document.documentElement.scrollTop;

    this.isSticky = scrollPosition > stickyTrigger;
  }
}
