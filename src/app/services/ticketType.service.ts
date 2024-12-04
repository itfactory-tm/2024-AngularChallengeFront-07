import { Injectable } from '@angular/core';
import { TicketType } from '../interfaces/ticketType';
import { Observable } from 'rxjs';
import {v4 as uuidv4} from "uuid";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class TicketTypeService {

  private ticketType: TicketType[] = [];
  private apiUrl = `${environment.api_url}/ticketType`;

  constructor(private httpClient: HttpClient) {
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
    return this.httpClient.get<TicketType[]>(this.apiUrl);
  }

  getTicketTypeById(id: string): Observable<TicketType> {
    return this.httpClient.get<TicketType>(`${this.apiUrl}/${id}`);
  }

  postTicketType(ticketType: TicketType): Observable<TicketType> {
    ticketType.typeId = uuidv4();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<TicketType>(`${this.apiUrl}/`, ticketType, {headers: headers});
  }

  putTicketType(id: string, ticketType: TicketType): Observable<TicketType> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<TicketType>(`${this.apiUrl}/${id}`, ticketType, {headers: headers});
  }

  deleteTicketType(id: string): Observable<TicketType> {
    return this.httpClient.delete<TicketType>(`${this.apiUrl}/${id}`);
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
