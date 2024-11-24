import { Injectable } from '@angular/core';
import { TicketType } from './ticketType';
import { Ticket } from './interfaces/ticket';

@Injectable({
    providedIn: 'root'
})export class TicketTypeService {

private ticketType: TicketType[] = [];

constructor() { 

    let regular : TicketType = {
        typeId: 1,
        naam: "Regular",
        prijs: 10
    };

    let ploes : TicketType = {
        typeId: 2,
        naam: "Ploes",
        prijs: 12
    };

    let VIP : TicketType = {
        typeId: 3,
        naam: "VIP",
        prijs: 15
    };

    this.ticketType.push(regular);
    this.ticketType.push(ploes);
    this.ticketType.push(VIP);
}

    getTicketTypes(): TicketType[] {
        return this.ticketType;
    }
    
    getTicketTypeById(id: number): TicketType | undefined{
        return this.ticketType.find(ticketType => ticketType.typeId === id);
    }
}
