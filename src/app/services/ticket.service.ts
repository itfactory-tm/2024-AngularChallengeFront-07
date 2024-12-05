import { Injectable } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {v4 as uuidv4} from 'uuid';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TicketType } from '../interfaces/ticketType';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  private tickets: Ticket[] = [];

  private selectedTickets: Ticket[] = [];

  private ApiUrl = `${environment.api_url}/tickets`;

  constructor( private httpClient: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`${this.ApiUrl}`);
  }

  getTicketById(id: string): Observable<Ticket> {
    const tijdelijk = this.httpClient.get<Ticket>(`${this.ApiUrl}/${id}`);

    console.log(tijdelijk);
    return tijdelijk
  }

  // getTicketById(i: number): Ticket {
  //   return this.tickets[i]
  // }

  getSelectedTickets(): Ticket[] {
    return this.selectedTickets;
  }

  setSelectedTickets(tickets: Ticket[]): void {
    this.selectedTickets = tickets;
  }
  postTicket(ticket: Ticket): Observable<Ticket> {
    ticket.ticketId = uuidv4();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Ticket>(`${this.ApiUrl}/`, ticket, {headers: headers});
  }

  putTicket(id: string, ticket: Ticket): Observable<Ticket> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Ticket>(`${this.ApiUrl}/${id}`, ticket, {headers: headers});
  }

  deleteTicket(id: string): Observable<Ticket> {
    return this.httpClient.delete<Ticket>(`${this.ApiUrl}/${id}`);
  }
}

