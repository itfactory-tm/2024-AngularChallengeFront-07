import { Component, HostListener } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { Day } from '../interfaces/day';
import { DayService } from '../services/day.service';
import { TicketsComponent } from '../tickets/tickets.component';
import { TicketService } from '../services/ticket.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { tick } from '@angular/core/testing';
import { Observable } from 'rxjs';

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

  days: Day[] = [];
  tickets : Ticket[] = [];

  ticketsByDay: { [key: number]: Ticket[] } = {};

  resultArray: Ticket[] = [];


  isSticky: boolean = false;
  

  constructor(private dayService: DayService, private ticketService: TicketService, private router: Router){}

  ngOnInit(): void {
    this.days = this.dayService.getDays();
    this.tickets = this.ticketService.getTickets();

    this.days.forEach(dag => {
      this.ticketsByDay[dag.dayId] = this.tickets.filter(ticket => ticket.dayId === dag.dayId);
    });

  }

  //Submit tickets for buying
  addTickets(ticket: Ticket, amount: number): void {
    for (let i = 0; i < amount; i++) {
      this.resultArray.push(ticket);  // Add the ticket 'amount' times to the result array
    }
  }

  // Submit the selected tickets
  submitTickets(): void {
    this.resultArray = []; // Reset result array
    this.tickets.forEach(ticket => {
      const inputElement = document.getElementById(`ticket-input-${ticket.ticketId}`) as HTMLInputElement;
      const amount = parseInt(inputElement.value, 10) || 0;  // Get the input value or default to 0
      this.addTickets(ticket, amount);  // Add ticket that many times
    });
    this.ticketService.setSelectedTickets(this.resultArray); // Display the selected tickets
    console.log(this.ticketService.getSelectedTickets());
    this.router.navigate(['/order-ticket']);

  }




  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const stickyTrigger = 200; // Pixels from the top where the sticky behavior starts
    const scrollPosition =
      window.pageXOffset || document.documentElement.scrollTop;

    this.isSticky = scrollPosition > stickyTrigger;
  }
}
