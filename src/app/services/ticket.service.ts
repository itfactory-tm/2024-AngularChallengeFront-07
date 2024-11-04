import { Injectable } from '@angular/core';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private tickets: Ticket[] = [];

  constructor() {

    let ticket1: Ticket = {
      ticketId: 1,
      prijs: 10,
      amountTickets : 200,
      typeId : 1,
      editieId : 1,
    };

    let ticket2: Ticket = {
      ticketId: 2,
      prijs: 10,
      amountTickets : 200,
      typeId : 2,
      editieId : 1,
    };

    let ticket3: Ticket = {
      ticketId: 3,
      prijs: 10,
      amountTickets : 200,
      typeId : 3,
      editieId : 1,
    };

    let ticket4: Ticket = {
      ticketId: 4,
      prijs: 10,
      amountTickets : 200,
      typeId : 1,
      editieId : 1,
    };

    let ticket5: Ticket = {
      ticketId: 5,
      prijs: 10,
      amountTickets : 200,
      typeId : 2,
      editieId : 1,
    };

    let ticket6: Ticket = {
      ticketId: 6,
      prijs: 10,
      amountTickets : 200,
      typeId : 3,
      editieId : 1,
    };

    let ticket7: Ticket = {
      ticketId: 7,
      prijs: 10,
      amountTickets : 200,
      typeId : 1,
      editieId : 1,
    };

    let ticket8: Ticket = {
      ticketId: 8,
      prijs: 10,
      amountTickets : 200,
      typeId : 2,
      editieId : 1,
    };

    let ticket9: Ticket = {
      ticketId: 9,
      prijs: 10,
      amountTickets : 200,
      typeId : 3,
      editieId : 1,
    };

    let ticket10: Ticket = {
      ticketId: 10,
      prijs: 10,
      amountTickets : 200,
      typeId : 1,
      editieId : 1,
    };

    let ticket11: Ticket = {
      ticketId: 11,
      prijs: 10,
      amountTickets : 200,
      typeId : 2,
      editieId : 1,
    };

    let ticket12: Ticket = {
      ticketId: 12,
      prijs: 10,
      amountTickets : 200,
      typeId : 3,
      editieId : 1,
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
  }

  getTickets(): Ticket[] {
    return this.tickets;
  }


}
