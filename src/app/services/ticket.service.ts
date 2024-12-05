import { Injectable } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  private tickets: Ticket[] = [];

  private selectedTickets: Ticket[] = [];

  private ApiUrl = `${environment.api_url}/tickets`;

  constructor(private apiService: ApiService, private httpClient: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`${this.ApiUrl}`);
  }

  getTicketById(id: string): Observable<Ticket> {
    const tijdelijk = this.apiService.getById<Ticket>('Tickets', id);

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
    return this.apiService.post<Ticket>('Tickets', ticket);
  }

  putTicket(id: string, ticket: Ticket): Observable<Ticket> {
    return this.apiService.put<Ticket>('Tickets', id, ticket);
  }

  deleteTicket(id: string): Observable<Ticket> {
    return this.apiService.delete<Ticket>('Tickets', id);
  }
}

// private tickets: Ticket[] = [];

// constructor() {

//   let ticket1: Ticket = {
//     ticketId: 1,
//     prijs: 10,
//     amountTickets : 200,
//     typeId : 1,
//     editieId : 1,
//     dagId: 1,
//   };

//   let ticket2: Ticket = {
//     ticketId: 2,
//     prijs: 10,
//     amountTickets : 200,
//     typeId : 2,
//     editieId : 1,
//     dagId: 1,
//   };

//   let ticket3: Ticket = {
//     ticketId: 3,
//     prijs: 10,
//     amountTickets : 200,
//     typeId : 3,
//     editieId : 1,
//     dagId: 1,
//   };

//   let ticket4: Ticket = {
//     ticketId: 4,
//     prijs: 10,
//     amountTickets : 200,
//     typeId : 1,
//     editieId : 1,
//     dagId: 2,
//   };

//   let ticket5: Ticket = {
//     ticketId: 5,
//     prijs: 10,
//     amountTickets : 200,
//     typeId : 2,
//     editieId : 1,
//     dagId: 2,
//   };

//   let ticket6: Ticket = {
//     ticketId: 6,
//     prijs: 10,
//     amountTickets : 200,
//     typeId : 3,
//     editieId : 1,
//     dagId: 2,
//   };

//   let ticket7: Ticket = {
//     ticketId: 7,
//     prijs: 10,
//     amountTickets : 200,
//     typeId : 1,
//     editieId : 1,
//     dagId: 3,
//   };

//   let ticket8: Ticket = {
//     ticketId: 8,
//     prijs: 10,
//     amountTickets : 200,
//     typeId : 2,
//     editieId : 1,
//     dagId: 3,
//   };

//   let ticket9: Ticket = {
//     ticketId: 9,
//     prijs: 10,
//     amountTickets : 200,
//     typeId : 3,
//     editieId : 1,
//     dagId: 3,
//   };

//   let ticket10: Ticket = {
//     ticketId: 10,
//     prijs: 10,
//     amountTickets : 200,
//     typeId : 1,
//     editieId : 1,
//     dagId: 4,
//   };

//   let ticket11: Ticket = {
//     ticketId: 11,
//     prijs: 10,
//     amountTickets : 200,
//     typeId : 2,
//     editieId : 1,
//     dagId: 4,
//   };

//   let ticket12: Ticket = {
//     ticketId: 12,
//     prijs: 10,
//     amountTickets : 200,
//     typeId : 3,
//     editieId : 1,
//     dagId: 4,
//   };

//   this.tickets.push(ticket1);
//   this.tickets.push(ticket2);
//   this.tickets.push(ticket3);
//   this.tickets.push(ticket4);
//   this.tickets.push(ticket5);
//   this.tickets.push(ticket6);
//   this.tickets.push(ticket7);
//   this.tickets.push(ticket8);
//   this.tickets.push(ticket9);
//   this.tickets.push(ticket10);
//   this.tickets.push(ticket11);
//   this.tickets.push(ticket12);
// }

// getTickets(): Ticket[] {
//   return this.tickets;
// }}
