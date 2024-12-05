import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Observable } from 'rxjs';
import { Ticket } from '../../interfaces/ticket';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css',
})
export class TicketListComponent implements OnInit {
  tickets$: Observable<Ticket[]> = new Observable<Ticket[]>();
  errorMessage: string = '';

  constructor(private ticketService: TicketService, private router: Router) {}
  ngOnInit(): void {
    this.getTickets();
  }

  getTickets() {
    this.tickets$ = this.ticketService.getTickets();
    console.log(this.tickets$)
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/ticket/form'], { state: { mode: 'add' } });
  }

  edit(id: string) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/ticket/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: string) {
    this.ticketService.deleteTicket(id).subscribe({
      next: (v) => this.getTickets(),
      error: (e) => (this.errorMessage = e.message),
    });
  }
}

