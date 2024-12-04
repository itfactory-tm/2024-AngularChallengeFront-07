import { Injectable } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private apiService: ApiService) { }

  getTickets(): Observable<Ticket[]> {
    return this.apiService.get<Ticket[]>('Tickets');
  }

  getTicketById(id: string): Observable<Ticket> {
    return this.apiService.getById<Ticket>('Tickets', id);
  }

  // Other methods remain unchanged
}
