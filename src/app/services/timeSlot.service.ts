import { Injectable } from '@angular/core';
import { TimeSlot } from '../interfaces/timeSlot';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TimeSlotService {
  constructor(private httpClient: HttpClient) { }
  private apiUrl = `${environment.api_url}/TimeSlots`; // Use environment variable

  getTimeSlots(): Observable<TimeSlot[]> {
    return this.httpClient.get<TimeSlot[]>(this.apiUrl);
  }

  getTimeSlotById(id: string): Observable<TimeSlot> {
    return this.httpClient.get<TimeSlot>(`${this.apiUrl}/${id}`);
  }

  postTimeSlot(timeSlot: TimeSlot): Observable<TimeSlot> {
    timeSlot.timeSlotId = uuidv4();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.httpClient.post<TimeSlot>(`${this.apiUrl}/`, timeSlot, { headers: headers });
  }

  putTimeSlot(id: string, timeSlot: TimeSlot): Observable<TimeSlot> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.httpClient.put<TimeSlot>(`${this.apiUrl}/${id}`, timeSlot, { headers: headers });
  }

  deleteTimeSlot(id: string): Observable<TimeSlot> {
    return this.httpClient.delete<TimeSlot>(`${this.apiUrl}/${id}`);
  }
}
