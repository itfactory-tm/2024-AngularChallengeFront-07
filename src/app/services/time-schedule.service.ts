import { Injectable } from '@angular/core';
import { TimeSchedule } from '../interfaces/time-schedule';

@Injectable({
  providedIn: 'root'
})
export class TimeScheduleService {

  private timeSchedules: TimeSchedule[] = [
    {
      timeId: 1,
      artistId: 1,
      stageId: 1,
      startSet: "11:00",
      endSet: "12:00"
    },
    {
      timeId: 2,
      artistId: 2,
      stageId: 1,
      startSet: "13:00",
      endSet: "14:00"
    },
    {
      timeId: 3,
      artistId: 3,
      stageId: 1,
      startSet: "14:30",
      endSet: "16:00"
    },
    {
      timeId: 4,
      artistId: 3,
      stageId: 2,
      startSet: "20:00",
      endSet: "23:00"
    },
  ];

  getTimeSchedules(): TimeSchedule[] {
    return this.timeSchedules;
  }
}
