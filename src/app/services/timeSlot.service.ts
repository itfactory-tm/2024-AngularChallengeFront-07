import { Injectable } from '@angular/core';
import { TimeSlot } from '../interfaces/timeSlot';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Import environment

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
    return this.httpClient.post<TimeSlot>(this.apiUrl, timeSlot);
  }

  putTimeSlot(id: string, timeSlot: TimeSlot): Observable<TimeSlot> {
    return this.httpClient.put<TimeSlot>(`${this.apiUrl}/${id}`, timeSlot);
  }

  deleteTimeSlot(id: string): Observable<TimeSlot> {
    return this.httpClient.delete<TimeSlot>(`${this.apiUrl}/${id}`);
  }
}
