import { Injectable } from '@angular/core';
import { TicketType } from '../interfaces/ticketType';
import { Ticket } from '../interfaces/ticket';

@Injectable({
    providedIn: 'root'
})export class TicketTypeService {

private ticketType: TicketType[] = [];

constructor() { 

    let regular : TicketType = {
        typeId: 1,
        name: "Regular",
        price: 10
    };

    let ploes : TicketType = {
        typeId: 2,
        name: "Ploes",
        price: 12
    };

    let VIP : TicketType = {
        typeId: 3,
        name: "VIP",
        price: 15
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
