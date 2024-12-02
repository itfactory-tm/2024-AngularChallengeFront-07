import { Injectable } from '@angular/core';
import { TicketType } from '../interfaces/ticketType';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TicketTypeService {

  private ticketType: TicketType[] = [];

  constructor(private apiService: ApiService) {
      let regular : TicketType = {
        typeId: "1",
        name: "Regular",
        price: 10
    };

    let ploes : TicketType = {
        typeId: "2",
        name: "Ploes",
        price: 12
    };

    let VIP : TicketType = {
        typeId: "3",
        name: "VIP",
        price: 15
    };

    this.ticketType.push(regular);
    this.ticketType.push(ploes);
    this.ticketType.push(VIP);}

  getTicketTypes(): Observable<TicketType[]> {
    return this.apiService.get<TicketType[]>('TicketTypes');
  }

  getTicketTypeById(id: string): Observable<TicketType> {
    return this.apiService.getById<TicketType>('TicketTypes', id);
  }

  postTicketType(ticketType: TicketType): Observable<TicketType> {
    return this.apiService.post<TicketType>('TicketTypes', ticketType);
  }

  putTicketType(id: string, ticketType: TicketType): Observable<TicketType> {
    return this.apiService.put<TicketType>('TicketTypes', id, ticketType);
  }

  deleteTicketType(id: string): Observable<TicketType> {
    return this.apiService.delete<TicketType>('TicketTypes', id);
  }
}


// constructor() { 

//     let regular : TicketType = {
//         typeId: 1,
//         naam: "Regular",
//         prijs: 10
//     };

//     let ploes : TicketType = {
//         typeId: 2,
//         naam: "Ploes",
//         prijs: 12
//     };

//     let VIP : TicketType = {
//         typeId: 3,
//         naam: "VIP",
//         prijs: 15
//     };

//     this.ticketType.push(regular);
//     this.ticketType.push(ploes);
//     this.ticketType.push(VIP);
// }

//     getTicketTypes(): TicketType[] {
//         return this.ticketType;
//     }
    
//     getTicketTypeById(id: number): TicketType | undefined{
//         return this.ticketType.find(ticketType => ticketType.typeId === id);
//     }
