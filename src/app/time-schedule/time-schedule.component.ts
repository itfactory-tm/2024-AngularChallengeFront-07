import { Component } from '@angular/core';
import { TimeScheduleService } from '../services/time-schedule.service';
import { CommonModule } from '@angular/common';
import { TimeSchedule } from '../interfaces/time-schedule';


@Component({
  selector: 'app-time-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-schedule.component.html',
  styleUrl: './time-schedule.component.css'
})
export class TimeScheduleComponent {
  timeSchedules: TimeSchedule[] = [];

  ngOnInit(): void {
    this.timeSchedules = this.timeScheduleService.getTimeSchedules();
  }

  constructor(private timeScheduleService: TimeScheduleService) { }

  parseTime(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours - 11) * 124 + 190 + ((minutes/60) * 124); //Day starts at 11:00
  }
  calculateElementPositionAndHeight(start: string, end: string) {
    const startPerformance = this.parseTime(start);
    const endPerformance = this.parseTime(end);
    const duration = endPerformance - startPerformance;

    return {
      top: startPerformance, // Position in minutes (convert to pixels as needed)
      height: duration // Duration in minutes (convert to pixels as needed)
    };
  }
}
