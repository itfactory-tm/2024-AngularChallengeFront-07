import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TimeScheduleService } from '../services/time-schedule.service';
import { CommonModule } from '@angular/common';
import { TimeSchedule } from '../interfaces/time-schedule';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../interfaces/artist';


@Component({
  selector: 'app-time-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-schedule.component.html',
  styleUrl: './time-schedule.component.css'
})
export class TimeScheduleComponent implements OnInit, OnChanges {
  timeSchedules: TimeSchedule[] = [];
  artists: Artist[] = [];
  
  @Input() selectedDay: string = 'vrijdag';
  stage: number = 1;

  constructor(
    private timeScheduleService: TimeScheduleService, 
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.updateScheduleAndArtists();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDay']) {
      this.updateScheduleAndArtists();
    }
  }

  updateScheduleAndArtists(): void {
    this.timeSchedules = this.timeScheduleService.getScheduleByDay(this.selectedDay);
    this.artists = this.timeSchedules.map(t => 
      this.artistService.getArtistById(t.artistId)!
    );
  }

  parseTime(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours - 11) * 124 + 190 + ((minutes / 60) * 124); // Start time at 11:00
  }

  calculateElementPositionAndHeight(start: string, end: string) {
    const startPerformance = this.parseTime(start);
    const endPerformance = this.parseTime(end);
    const duration = endPerformance - startPerformance;

    return {
      top: startPerformance,
      height: duration
    };
  }
}
