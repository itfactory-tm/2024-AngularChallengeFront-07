import { Injectable } from '@angular/core';
import { TimeSlot } from '../interfaces/timeSlot';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TimeSlotService {
  constructor(private httpClient: HttpClient) {}

  getTimeSlots(): Observable<TimeSlot[]> {
    return this.httpClient.get<TimeSlot[]>(
      'https://localhost:7005/api/TimeSlots'
    );
  }

  getTimeSlotById(id: string): Observable<TimeSlot> {
    return this.httpClient.get<TimeSlot>(
      'https://localhost:7005/api/TimeSlots/' + id
    );
  }

  postTimeSlot(timeSlot: TimeSlot): Observable<TimeSlot> {
    return this.httpClient.post<TimeSlot>(
      'https://localhost:7005/api/TimeSlots',
      timeSlot
    );
  }

  putTimeSlot(id: string, timeSlot: TimeSlot): Observable<TimeSlot> {
    return this.httpClient.put<TimeSlot>(
      'https://localhost:7005/api/TimeSlots/' + id,
      timeSlot,
    );
  }

  deleteTimeSlot(id: string): Observable<TimeSlot> {
    return this.httpClient.delete<TimeSlot>(
      'https://localhost:7005/api/TimeSlots/' + id
    );
  }
}
