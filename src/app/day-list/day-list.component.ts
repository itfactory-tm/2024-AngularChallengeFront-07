import { Component, HostListener } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { Day } from '../interfaces/day';
import { DayService } from '../services/day.service';
import { TicketsComponent } from '../tickets/tickets.component';
import { TicketService } from '../services/ticket.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable, map, forkJoin, BehaviorSubject, of } from 'rxjs';
import { TicketTypeService } from '../services/ticketType.service';
import { TicketType } from '../interfaces/ticketType';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-day-list',
  standalone: true,
  imports: [TicketsComponent, CommonModule, RouterModule, LoaderComponent],
  templateUrl: './day-list.component.html',
  styleUrl: './day-list.component.css',
})
export class DayListComponent {
  days$: BehaviorSubject<Day[]> = new BehaviorSubject<Day[]>([]);
  tickets$: BehaviorSubject<Ticket[]> = new BehaviorSubject<Ticket[]>([]);
  filteredTicketsMap: Map<string, Observable<Ticket[]>> = new Map();

  resultArray: Ticket[] = [];

  isSticky: boolean = false;
  totalSelectedTickets: number = 0;
  selectedTicketQuantities: Map<string, number> = new Map();

  // Unified loading state flag
  isLoading: boolean = true;

  ticketTypeMap: Map<string, TicketType> = new Map();

  constructor(
    private dayService: DayService,
    private ticketService: TicketService,
    private ticketTypeService: TicketTypeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Use forkJoin to load days, tickets, and ticket types concurrently
    forkJoin({
      days: this.dayService.getDays(),
      tickets: this.ticketService.getTickets(),
      ticketTypes: this.ticketTypeService.getAllTicketTypes()
    }).subscribe({
      next: ({ days, tickets, ticketTypes }) => {
        this.days$.next(days);
        this.tickets$.next(tickets);

        // Create a map for easy access to ticket types
        this.ticketTypeMap = new Map(ticketTypes.map(tt => [tt.ticketTypeId, tt]));

        // Populate the filteredTicketsMap
        days.forEach(day => {
          const filtered = tickets.filter(ticket => ticket.dayId === day.dayId);
          this.filteredTicketsMap.set(day.dayId, of(filtered));
        });

        this.isLoading = false; // Set loading to false after all data is loaded
      },
      error: (err) => {
        console.error('Error loading data', err);
        this.isLoading = false;
        // Optionally, handle the error state here
      }
    });
  }

  getTicketsByDay(dayId: string): Observable<Ticket[]> {
    return this.filteredTicketsMap.get(dayId) || of([]);
  }

  // Submit tickets for buying
  addTickets(ticket: Ticket, amount: number): void {
    for (let i = 0; i < amount; i++) {
      console.log(ticket);
      this.resultArray.push(ticket); // Add the ticket 'amount' times to the result array
    }
  }

  onTicketQuantityChange(event: { ticketId: string; quantity: number }): void {
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
      const tickets = this.tickets$.getValue();
      const ticket = tickets.find(t => t.ticketId === ticketId);
      if (ticket) {
        this.addTickets(ticket, quantity);
      }
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
