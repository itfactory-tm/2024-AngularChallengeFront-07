import { Injectable } from '@angular/core';
import { Edition } from '../interfaces/edition';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function
import { environment } from '../../environments/environment'; // Import environment


@Injectable({
  providedIn: 'root',
})
export class EditionService {
  constructor(private httpClient: HttpClient) { }
  private apiUrl = `${environment.api_url}/Edition`; // Use environment variable


  getEditions(): Observable<Edition[]>{

    return this.httpClient.get<Edition[]>(this.apiUrl);
  }

  getEditionById(id: string): Observable<Edition> {
    return this.httpClient.get<Edition>(`${this.apiUrl}/${id}`);
  }

  postEdition(edition: Edition): Observable<Edition> {
    edition.editionId = uuidv4(); // Generate a new UUID
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Edition>(`${this.apiUrl}/`, edition, {
      headers: headers,
    });
  }

  putEdition(id: string, edition: Edition): Observable<Edition> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Edition>(`${this.apiUrl}/${id}`, edition, {
      headers: headers,
    });
  }

  deleteEdition(id: string): Observable<Edition> {
    return this.httpClient.delete<Edition>(`${this.apiUrl}/${id}`);
  }
}
