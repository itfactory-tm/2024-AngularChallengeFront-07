import { Injectable } from '@angular/core';
import { Edition } from '../interfaces/edition';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditionService {
  constructor(private httpClient: HttpClient) {}

  getEditions(): Observable<Edition[]> {
    return this.httpClient.get<Edition[]>('http://localhost:8080/api/Editie');
  }
}