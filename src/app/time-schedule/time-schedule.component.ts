import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TimeSlotService } from '../services/timeSlot.service';
import { CommonModule } from '@angular/common';
import { TimeSlot } from '../interfaces/timeSlot';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../interfaces/artist';
import { forkJoin, Observable } from 'rxjs';


@Component({
  selector: 'app-time-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-schedule.component.html',
  styleUrl: './time-schedule.component.css'
})
export class TimeComponent implements OnInit {
  timeSchedules: TimeSlot[] = [];
  artists$: Observable<Artist[]> = new Observable<Artist[]>();
  artists: Artist[] = [];
  
  @Input() selectedDay: string = 'vrijdag';
  stage: number = 1;

  constructor(
    private timeSlotService: TimeSlotService, 
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    // this.updateScheduleAndArtists();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['selectedDay']) {
  //     this.updateScheduleAndArtists();
  //   }
  // }

  // updateScheduleAndArtists(): void {
  //   this.timeSchedules = this.timeSlotService.getScheduleByDay(this.selectedDay);
  //   forkJoin(
  //     this.timeSchedules.map(t => this.artistService.getArtistById(t.artistId)!)
  //   ).subscribe(artists => {
  //     this.artists = artists;
  //   });
  // }

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
