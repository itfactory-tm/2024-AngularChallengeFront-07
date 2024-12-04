import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from '../interfaces/sponsor';

import { v4 as uuidv4 } from 'uuid';
import {environmentDev} from "../../environments/environment.development"; // Import the uuid function


@Injectable({
  providedIn: 'root',
})
export class SponsorService {

  constructor(private httpClient: HttpClient) {}
  private apiUrl = `${environmentDev.api_url}/api/Sponsors`;
  private apiUrl2 = `https://localhost:7005/api/Sponsors`;


  getSponsors(): Observable<Sponsor[]> {
    return this.httpClient.get<Sponsor[]>(this.apiUrl);
  }

  getSponsorById(id: string): Observable<Sponsor> {
    return this.httpClient.get<Sponsor>(`${this.apiUrl}/${id}`);
  }

  postSponsor(sponsor: Sponsor): Observable<Sponsor> {
    sponsor.sponsorId = uuidv4(); // Generate a new UUID for the sponsor
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Sponsor>(`${this.apiUrl}/`, sponsor, {
      headers: headers,
    });
  }

  putSponsor(id: string, sponsor: Sponsor): Observable<Sponsor> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Sponsor>(`${this.apiUrl}/${id}`, sponsor, {
      headers: headers,
    });
  }

  deleteSponsor(id: string): Observable<Sponsor> {
    return this.httpClient.delete<Sponsor>(`${this.apiUrl}/${id}`);
  }
}
