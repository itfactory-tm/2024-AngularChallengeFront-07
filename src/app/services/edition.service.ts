import { Injectable } from '@angular/core';
import { Edition } from '../interfaces/edition';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditionService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl2 = 'https://localhost:7005/api/Edition';
  private apiUrl = 'http://localhost:8080/api/Edition';

  getEditions(): Observable<Edition[]>{
    return this.httpClient.get<Edition[]>(this.apiUrl);
  }

  getEditionById(id: string): Observable<Edition> {
    return this.httpClient.get<Edition>(`${this.apiUrl}/${id}`);
  }

  postEdition(edition: Edition): Observable<Edition> {
    return this.httpClient.post<Edition>(`${this.apiUrl}/`, edition);
  }

  putEdition(id: string, edition: Edition): Observable<Edition> {
    return this.httpClient.put<Edition>(`${this.apiUrl}/${id}`, edition);
  }

  deleteEdition(id: string): Observable<Edition> {
    return this.httpClient.delete<Edition>(`${this.apiUrl}/${id}`);
  }
}
