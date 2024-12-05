import { Injectable } from '@angular/core';
import { Day } from '../interfaces/day';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {v4 as uuidv4} from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class DayService {

  private day: Day[] = [];

  private ApiUrl = `${environment.api_url}/days`;

  constructor(private httpClient: HttpClient) {
  }

  getDays(): Observable<Day[]> {
    return this.httpClient.get<Day[]>(`${this.ApiUrl}`);
  }

  getDayById(id: string): Observable<Day> {
    return this.httpClient.get<Day>(`${this.ApiUrl}/${id}`);
  }

  postDay(day: Day): Observable<Day> {
    day.dayId = uuidv4();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Day>(`${this.ApiUrl}/`,day, { headers: headers });
  }

  putDay(id: string, day: Day): Observable<Day> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Day>(`${this.ApiUrl}/${id}`, day, { headers: headers });
  }

  deleteDay(id: string): Observable<Day> {
    return this.httpClient.delete<Day>(`${this.ApiUrl}/${id}`);
  }
}

