import { Injectable } from '@angular/core';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private tickets: Ticket[] = [];

  private selectedTickets: Ticket[] = [];

  constructor() {

    let ticket1: Ticket = {
      ticketId: 1,
      price: 10,
      amountTickets : 200,
      typeId : 1,
      editionId : 1,
      dayId: 1,
    };

    let ticket2: Ticket = {
      ticketId: 2,
      price: 10,
      amountTickets : 200,
      typeId : 2,
      editionId : 1,
      dayId: 1,
    };

    let ticket3: Ticket = {
      ticketId: 3,
      price: 10,
      amountTickets : 200,
      typeId : 3,
      editionId : 1,
      dayId: 1,
    };

    let ticket4: Ticket = {
      ticketId: 4,
      price: 10,
      amountTickets : 200,
      typeId : 1,
      editionId : 1,
      dayId: 2,
    };

    let ticket5: Ticket = {
      ticketId: 5,
      price: 10,
      amountTickets : 200,
      typeId : 2,
      editionId : 1,
      dayId: 2,
    };

    let ticket6: Ticket = {
      ticketId: 6,
      price: 10,
      amountTickets : 200,
      typeId : 3,
      editionId : 1,
      dayId: 2,
    };

    let ticket7: Ticket = {
      ticketId: 7,
      price: 10,
      amountTickets : 200,
      typeId : 1,
      editionId : 1,
      dayId: 3,
    };

    let ticket8: Ticket = {
      ticketId: 8,
      price: 10,
      amountTickets : 200,
      typeId : 2,
      editionId : 1,
      dayId: 3,
    };

    let ticket9: Ticket = {
      ticketId: 9,
      price: 10,
      amountTickets : 200,
      typeId : 3,
      editionId : 1,
      dayId: 3,
    };

    let ticket10: Ticket = {
      ticketId: 10,
      price: 10,
      amountTickets : 200,
      typeId : 1,
      editionId : 1,
      dayId: 4,
    };

    let ticket11: Ticket = {
      ticketId: 11,
      price: 10,
      amountTickets : 200,
      typeId : 2,
      editionId : 1,
      dayId: 4,
    };

    let ticket12: Ticket = {
      ticketId: 12,
      price: 10,
      amountTickets : 200,
      typeId : 3,
      editionId : 1,
      dayId: 4,
    };

    this.tickets.push(ticket1);
    this.tickets.push(ticket2);
    this.tickets.push(ticket3);
    this.tickets.push(ticket4);
    this.tickets.push(ticket5);
    this.tickets.push(ticket6);
    this.tickets.push(ticket7);
    this.tickets.push(ticket8);
    this.tickets.push(ticket9);
    this.tickets.push(ticket10);
    this.tickets.push(ticket11);
    this.tickets.push(ticket12);

    this.selectedTickets.push(ticket1);
    this.selectedTickets.push(ticket3);
    this.selectedTickets.push(ticket5);

  }

  getTickets(): Ticket[] {
    return this.tickets;
  }

  getTicketById(i: number): Ticket {
    return this.tickets[i]
  }

  getSelectedTickets(): Ticket[]{
    return this.selectedTickets;
  }

  setSelectedTickets(tickets: Ticket[]): void {
    this.selectedTickets = tickets;
  }

}
