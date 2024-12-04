import { Injectable } from "@angular/core";
import { BoughtTickets } from "../interfaces/bought-tickets";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class BoughtTicketService {
    private boughtTicket: BoughtTickets[] = [];

    private ApiUrl = "http://localhost:8080/api/boughtTickets";

    constructor(private httpClient: HttpClient) {

    }

    addTickets(ticket: BoughtTickets): void {
        this.boughtTicket.push(ticket);
    }

    postTicket(ticket: BoughtTicketService): Observable<BoughtTicketService> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.post<BoughtTicketService>(`${this.ApiUrl}`, ticket, {headers: headers});
    }

    getTickets(): BoughtTickets[] {
        return this.boughtTicket;
    }
    
}