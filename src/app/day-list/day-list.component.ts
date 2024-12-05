import { Component, HostListener } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { Day } from '../interfaces/day';
import { DayService } from '../services/day.service';
import { TicketsComponent } from '../tickets/tickets.component';
import { TicketService } from '../services/ticket.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { tick } from '@angular/core/testing';
import { Observable, map } from 'rxjs';
import { of, from } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';


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
  filteredTickets$: Observable<Ticket[]> = new Observable<Ticket[]>();; 
  filteredTicketsMap: Map<string, Observable<Ticket[]>> = new Map();


  //days: Day[] = [];
  //tickets : Ticket[] = [];

  ticketsByDay: { [key: string]: Ticket[] } = {};

  resultArray: Ticket[] = [];


  isSticky: boolean = false;
  

  constructor(private dayService: DayService, private ticketService: TicketService, private router: Router){}

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
  

  //Submit tickets for buying
  addTickets(ticket: Ticket, amount: number): void {
    for (let i = 0; i < amount; i++) {
      console.log(ticket)
      this.resultArray.push(ticket);  // Add the ticket 'amount' times to the result array
    }
  }

  // Submit the selected tickets
  submitTickets(): void {
    this.resultArray = []; // Reset result array

    this.tickets$.subscribe((tickets: Ticket[]) => {
      // Iterate over the array of tickets directly inside the subscribe block
      tickets.forEach(ticket => {
        const inputElement = document.getElementById(`ticket-input-${ticket.ticketId}`) as HTMLInputElement;
        if (inputElement) {
          const amount = parseInt(inputElement.value, 10) || 0;
          this.addTickets(ticket, amount);
        }
      });
    
      this.ticketService.setSelectedTickets(this.resultArray); // Display the selected tickets
      this.router.navigate(['/order-ticket']); //Routing to the next page for entering the names
    }, error => {
      console.error('Error processing tickets', error);
    });    
    
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const stickyTrigger = 200; // Pixels from the top where the sticky behavior starts
    const scrollPosition =
      window.pageXOffset || document.documentElement.scrollTop;

    this.isSticky = scrollPosition > stickyTrigger;
  }
}
