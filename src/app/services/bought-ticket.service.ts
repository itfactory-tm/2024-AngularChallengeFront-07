import { Injectable } from "@angular/core";
import { BoughtTickets } from "../interfaces/bought-tickets";

@Injectable({
    providedIn: 'root'
})
export class BoughtTicketService {
    private boughtTicket: BoughtTickets[] = [];

    constructor() {

    }

    addTickets(ticket: BoughtTickets): void {
        this.boughtTicket.push(ticket);
    }

    getTickets(): BoughtTickets[] {
        return this.boughtTicket;
    }
    
}