import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../interfaces/ticket';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { EditionService } from '../../services/edition.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Edition } from '../../interfaces/edition';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.css',
})
export class TicketFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  ticketId: string = '';
  editions$: Observable<Edition[]> = new Observable<Edition[]>();

  ticket: Ticket = {
    ticketId: '',
    editionId: '',
    editionName: '',
    ticketTypeId : '',
    ticketPrice: 0,
    dayId: '',
    dayName: '',
    amountTickets: 0,
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private editionService: EditionService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit';
    this.ticketId = state['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }
  ngOnInit(): void {
    this.editions$ = this.editionService.getEditions();
    if (this.ticketId != null) {
      this.ticketService.getTicketById(this.ticketId).subscribe((result) => {
        this.ticket = result;
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.ticketService.postTicket(this.ticket).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/ticket'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
    if (this.isEdit) {
      this.ticketService.putTicket(this.ticketId, this.ticket).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/ticket'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
  }
}
