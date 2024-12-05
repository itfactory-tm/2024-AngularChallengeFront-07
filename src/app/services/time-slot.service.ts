import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { TimeSlot } from '../interfaces/time-slot';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeSlotService {
  private apiUrl = 'http://localhost:8080/api/timeslots';

  constructor(private httpClient: HttpClient) {} 

  getTimeslots(): Observable<TimeSlot[]> {
    return this.httpClient.get<TimeSlot[]>(this.apiUrl);
  }

  getTimeslotId(id: string): Observable<TimeSlot> {
    return this.httpClient.get<TimeSlot>(`${this.apiUrl}/${id}`);
  }

  postTimeslot(timeslot: TimeSlot): Observable<TimeSlot> {
    return this.httpClient.post<TimeSlot>(this.apiUrl, timeslot);
  }

  putTimeslot(id: string, timeslot: TimeSlot): Observable<TimeSlot> {
    return this.httpClient.put<TimeSlot>(`${this.apiUrl}/${id}`, timeslot);
  }

  deleteTimeslot(id: string): Observable<TimeSlot> {
    return this.httpClient.delete<TimeSlot>(`${this.apiUrl}/${id}`);
  }
}
