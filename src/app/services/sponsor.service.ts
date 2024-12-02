import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from '../interfaces/sponsor';

@Injectable({
  providedIn: 'root',
})
export class SponsorService {
  constructor(private httpClient: HttpClient) {}

  getSponsors(): Observable<Sponsor[]> {
    return this.httpClient.get<Sponsor[]>(
      'http://localhost:8080/api/Sponsors'
    );
  }

  getSponsorById(id: string): Observable<Sponsor> {
    return this.httpClient.get<Sponsor>(
      'http://localhost:8080/api/Sponsors/' + id
    );
  }

  postSponsor(sponsor: Sponsor): Observable<Sponsor> {
    return this.httpClient.post<Sponsor>(
      'http://localhost:8080/api/Sponsors',
      sponsor
    );
  }

  putSponsor(id: string, sponsor: Sponsor): Observable<Sponsor> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Sponsor>(
      'http://localhost:8080/api/Sponsors/' + id,
      sponsor,
      { headers: headers }
    );
  }

  deleteSponsor(id: string): Observable<Sponsor> {
    return this.httpClient.delete<Sponsor>(
      'http://localhost:8080/api/Sponsors/' + id
    );
  }
}
