import { Injectable } from '@angular/core';
import { Day } from '../interfaces/day';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DayService {

  private day: Day[] = [];

  private ApiUrl = 'http://localhost:8080/api/days';

  constructor(private httpClient: HttpClient) { 

    let Friday : Day = {
      dayId: "1",
      name: "Friday",
      startDate: new Date('2024-10-25T10:30:00'),
      endDate: new Date('2024-10-25T10:30:00'),
    };

    let Saturday : Day = {
      dayId: "2",
      name: "Saturday",
      startDate: new Date('2024-10-26T10:30:00'),
      endDate: new Date('2024-10-26T10:30:00')
    };

    let Sunday : Day = {
      dayId: "3",
      name: "Sunday",
      startDate: new Date('2024-10-27T10:30:00'),
      endDate: new Date('2024-10-27T10:30:00')
    };

    let Weekend : Day = {
      dayId: "4",
      name: "Weekend",
      startDate: new Date('2024-10-25T10:30:00'),
      endDate: new Date('2024-10-27T10:30:00')
    };

    this.day.push(Friday);
    this.day.push(Saturday);
    this.day.push(Sunday);
    this.day.push(Weekend);
  }

  getDays(): Observable<Day[]> {
    return this.httpClient.get<Day[]>(`${this.ApiUrl}`);
  }

  getDayById(i: number): Day {
    return this.day[i]
  }
}

