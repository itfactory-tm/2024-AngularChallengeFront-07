import { Injectable } from '@angular/core';
import { TimeSlot } from '../interfaces/timeSlot';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TimeSlotService {
  constructor(private httpClient: HttpClient) { }
  private apiUrl = "http://localhost:8080/api/TimeSlots";
  private apiUrl2 = "https://localhost:7005/api/Locations";

  getTimeSlots(): Observable<TimeSlot[]> {
    return this.httpClient.get<TimeSlot[]>(this.apiUrl);
  }

  getTimeSlotById(id: string): Observable<TimeSlot> {
    return this.httpClient.get<TimeSlot>(this.apiUrl + id);
  }

  postTimeSlot(timeSlot: TimeSlot): Observable<TimeSlot> {
    return this.httpClient.post<TimeSlot>(this.apiUrl, timeSlot);
  }

  putTimeSlot(id: string, timeSlot: TimeSlot): Observable<TimeSlot> {
    return this.httpClient.put<TimeSlot>(this.apiUrl + id, timeSlot,);
  }

  deleteTimeSlot(id: string): Observable<TimeSlot> {
    return this.httpClient.delete<TimeSlot>(this.apiUrl + id);
  }
}
