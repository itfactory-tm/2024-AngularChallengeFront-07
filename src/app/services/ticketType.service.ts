import { Injectable } from '@angular/core';
import { TicketType } from '../interfaces/ticketType';
import { Observable } from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketTypeService {

  private ApiUrl = `${environment.api_url}/ticketTypes`;

  private ticketType: TicketType[] = [];

  constructor( private httpClient: HttpClient) {

  }

  getTicketTypes(): Observable<TicketType[]> {
    return this.httpClient.get<TicketType[]>(`${this.ApiUrl}`);
  }

  getTicketTypeById(id: string): Observable<TicketType> {
    return this.httpClient.get<TicketType>(`${this.ApiUrl}/${id}`);
  }

  postTicketType(ticketType: TicketType): Observable<TicketType> {
    ticketType.ticketTypeId = uuidv4();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.httpClient.post<TicketType>(`${this.ApiUrl}/`,ticketType, {headers: headers});
  }

  putTicketType(id: string, ticketType: TicketType): Observable<TicketType> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.httpClient.put<TicketType>(`${this.ApiUrl}/${id}`, ticketType, {headers: headers});
  }

  deleteTicketType(id: string): Observable<TicketType> {
    return this.httpClient.delete<TicketType>(`${this.ApiUrl}/${id}`);
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
