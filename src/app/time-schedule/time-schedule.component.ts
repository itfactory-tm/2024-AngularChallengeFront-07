import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TimeSlotService } from '../services/timeSlot.service';
import { CommonModule } from '@angular/common';
import { TimeSlot } from '../interfaces/timeSlot';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../interfaces/artist';
import { combineLatest, forkJoin, map, Observable, of } from 'rxjs';
import { StageService } from '../services/stage.service';
import { Stage } from '../interfaces/stage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-time-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-schedule.component.html',
  styleUrl: './time-schedule.component.css'
})
export class TimeScheduleComponent implements OnInit {
  timeSchedules$: Observable<TimeSlot[]> = new Observable<TimeSlot[]>();
  artists$: Observable<Artist[]> = new Observable<Artist[]>();
  stages$: Observable<Stage[]> = new Observable<Stage[]>();
  

  playTimes$: Observable<{ startTime: Date; endTime: Date } | undefined> | undefined;
  artistsWithSchedules$: Observable<{ name: string; startTime?: Date; endTime?: Date }[]> | undefined;
  stagesWithArtists$: Observable<any> | undefined;

  times: string[] = [
    '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00', '23:00', '24:00', '01:00', '02:00',
    '03:00', '04:00'
  ];

  @ViewChild('scrollableContainer', { static: false }) scrollableContainer!: ElementRef;

  @Input() selectedDay: string = 'friday';
  stage: number = 1;

  constructor(
    private timeSlotService: TimeSlotService,
    private artistService: ArtistService,
    private stageService: StageService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.updateScheduleAndArtists();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDay']) {
      this.updateScheduleAndArtists();
    }
  }

  updateScheduleAndArtists(): void {
    this.timeSchedules$ = this.timeSlotService.getTimeSlots();
    this.artists$ = this.artistService.getArtists();
    this.stages$ = this.stageService.getStages();
    this.stagesWithArtists$ = combineLatest([this.stages$, this.timeSchedules$, this.artists$]).pipe(
      map(([stages, timeSlots, artists]) => {
        return stages.map((stage) => {
          // Filter the time slots for this stage
          const artistsForStage = timeSlots
            .filter(slot => slot.stageId === stage.stageId) // Find the time slots for the current stage
            .map(slot => {
              // Find the artist corresponding to the time slot's artistId
              const artist = artists.find(a => a.artistId === slot.artistId);
              const stage = stages.find(s=>s.stageId === slot.stageId)
              return {
                artist: artist,
                stage: stage,
                startTime: slot.startTime,
                endTime: slot.endTime
              };
            });

          return { stage, artists: artistsForStage };
        });
      })
    );
  }

  parseTime(time: Date): number {

    const startHour = 11; // Adjust according to the time range
    const scale = 114; // Height of each hour block
    const baseValue = 75; // Top offset for the grid
  
    const hours = time.getHours();
    const minutes = time.getMinutes();
  
    const timeDifference = (hours - startHour) * scale + (minutes / 60) * scale;
  
    return baseValue + timeDifference;
  }
  
  calculateElementPositionAndHeight(start: Date, end: Date) {
    const startSet = new Date(start);
    const endSet = new Date(end);

    const startPosition = this.parseTime(startSet);
    const endPosition = this.parseTime(endSet);
    const duration = endPosition - startPosition;
  
    return {
      top: startPosition,
      height: duration
    };
  }

  setDay(day: string) {
    this.selectedDay = day;
  }
  detail(id: number) {
    this.router.navigate(['/artist', id]);
  }
  changeView(view: string) {

  }

  scrollLeft(): void {
    if (this.scrollableContainer) {
      this.scrollableContainer.nativeElement.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  }
  
  scrollRight(): void {
    if (this.scrollableContainer) {
      this.scrollableContainer.nativeElement.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  }
}
