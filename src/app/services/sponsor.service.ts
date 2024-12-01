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
      'https://localhost:7005/api/Sponsors'
    );
  }

  getSponsorById(id: string): Observable<Sponsor> {
    return this.httpClient.get<Sponsor>(
      'https://localhost:7005/api/Sponsors/' + id
    );
  }

  postSponsor(sponsor: Sponsor): Observable<Sponsor> {
    return this.httpClient.post<Sponsor>(
      'https://localhost:7005/api/Sponsors',
      sponsor
    );
  }

  putSponsor(id: string, sponsor: Sponsor): Observable<Sponsor> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Sponsor>(
      'https://localhost:7005/api/Sponsors/' + id,
      sponsor,
      { headers: headers }
    );
  }

  deleteSponsor(id: string): Observable<Sponsor> {
    return this.httpClient.delete<Sponsor>(
      'https://localhost:7005/api/Sponsors/' + id
    );
  }
}
