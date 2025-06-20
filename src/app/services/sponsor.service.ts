import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from '../interfaces/sponsor';

import { v4 as uuidv4 } from 'uuid';
import { environment } from "../../environments/environment"; // Import the uuid function


@Injectable({
  providedIn: 'root',
})
export class SponsorService {

  constructor(private httpClient: HttpClient) { }
  private apiUrl = `${environment.api_url}/Sponsors`;


  getSponsors(): Observable<Sponsor[]> {
    return this.httpClient.get<Sponsor[]>(this.apiUrl);
  }

  getSponsorById(id: string): Observable<Sponsor> {
    return this.httpClient.get<Sponsor>(`${this.apiUrl}/${id}`);
  }

  postSponsor(sponsor: Sponsor): Observable<Sponsor> {
    sponsor.sponsorId = uuidv4();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    console.log(sponsor);
    return this.httpClient.post<Sponsor>(`${this.apiUrl}/`, sponsor,{
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

  private isValidBase64(str: string): boolean {
    const base64Pattern = /^([A-Za-z0-9+\/=]|\n)*$/;
    return base64Pattern.test(str);
  }
}
