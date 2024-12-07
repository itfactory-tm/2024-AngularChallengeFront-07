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

  // artists: Artist[] = [
  //   {
  //     artistId: '1',
  //     name: 'John Doe',
  //     mail: 'john.doe@example.com',
  //     description: 'A talented rock musician.',
  //     spotifyLink: 'https://spotify.com/johndoe',
  //     apiCode: 'JD2023',
  //     spotifyPhoto: 'https://example.com/johndoe.jpg',
  //     genre: 'Rock',
  //     editionId: 'E1',
  //     editionName: 'Summer Fest 2023',
  //   },
  //   {
  //     artistId: '2',
  //     name: 'Jane Smith',
  //     mail: 'jane.smith@example.com',
  //     description: 'An up-and-coming pop sensation.',
  //     spotifyLink: 'https://spotify.com/janesmith',
  //     apiCode: 'JS2023',
  //     spotifyPhoto: 'https://example.com/janesmith.jpg',
  //     genre: 'Pop',
  //     editionId: 'E1',
  //     editionName: 'Summer Fest 2023',
  //   },
  //   {
  //     artistId: '3',
  //     name: 'wam',
  //     mail: 'wam.wam@example.com',
  //     description: 'A talented rock musician.',
  //     spotifyLink: 'https://spotify.com/johndoe',
  //     apiCode: 'JD2023',
  //     spotifyPhoto: 'https://example.com/johndoe.jpg',
  //     genre: 'Rock',
  //     editionId: 'E1',
  //     editionName: 'Summer Fest 2023',
  //   },
  //   {
  //     artistId: '4',
  //     name: 'bam',
  //     mail: 'bam.bam@example.com',
  //     description: 'A talented rock musician.',
  //     spotifyLink: 'https://spotify.com/johndoe',
  //     apiCode: 'JD2023',
  //     spotifyPhoto: 'https://example.com/johndoe.jpg',
  //     genre: 'Rock',
  //     editionId: 'E1',
  //     editionName: 'Summer Fest 2023',
  //   },
  // ];

  // // Dummy data for stages
  // stages: Stage[] = [
  //   {
  //     stageId: 'S1',
  //     name: 'Main Stage',
  //     locationId: 'L1',
  //     locationName: 'Central Park',
  //     timeSlots: [],
  //     photos: ['https://example.com/mainstage.jpg'],
  //   },
  //   {
  //     stageId: 'S2',
  //     name: 'Acoustic Stage',
  //     locationId: 'L2',
  //     locationName: 'Hilltop',
  //     timeSlots: [],
  //     photos: ['https://example.com/acousticstage.jpg'],
  //   },
  //   {
  //     stageId: 'S3',
  //     name: '3 Stage',
  //     locationId: 'L3',
  //     locationName: 'L3',
  //     timeSlots: [],
  //     photos: ['https://example.com/acousticstage.jpg'],
  //   },
  //   {
  //     stageId: 'S4',
  //     name: '4 Stage',
  //     locationId: 'L3',
  //     locationName: 'L3',
  //     timeSlots: [],
  //     photos: ['https://example.com/acousticstage.jpg'],
  //   },
  // ];

  // // Dummy data for time slots
  // timeSlots: TimeSlot[] = [
  //   {
  //     timeSlotId: 'TS1',
  //     startTime: new Date('2023-06-21T18:00:00'),
  //     endTime: new Date('2023-06-21T19:00:00'),
  //     artistId: '1',
  //     artistName: 'John Doe',
  //     stageId: 'S1',
  //     stageName: 'Main Stage',
  //   },
  //   {
  //     timeSlotId: 'TS2',
  //     startTime: new Date('2023-06-21T19:30:00'),
  //     endTime: new Date('2023-06-21T20:30:00'),
  //     artistId: '2',
  //     artistName: 'Jane Smith',
  //     stageId: 'S2',
  //     stageName: 'Acoustic Stage',
  //   },
  //   {
  //     timeSlotId: 'TS3',
  //     startTime: new Date('2023-06-21T18:30:00'),
  //     endTime: new Date('2023-06-21T19:30:00'),
  //     artistId: '3',
  //     artistName: 'BoB',
  //     stageId: 'S3',
  //     stageName: 'Acoustic Stage',
  //   },
  //   {
  //     timeSlotId: 'TS4',
  //     startTime: new Date('2023-06-21T15:00:00'),
  //     endTime: new Date('2023-06-21T18:00:00'),
  //     artistId: '4',
  //     artistName: 'karl',
  //     stageId: 'S3',
  //     stageName: 'Acoustic Stage',
  //   },
  //   {
  //     timeSlotId: 'TS5',
  //     startTime: new Date('2023-06-21T15:30:00'),
  //     endTime: new Date('2023-06-21T16:30:00'),
  //     artistId: '4',
  //     artistName: 'karl',
  //     stageId: 'S4',
  //     stageName: 'Acoustic Stage',
  //   },
  // ];
  // timeSchedules$: Observable<TimeSlot[]> = of(this.timeSlots);
  // artists$: Observable<Artist[]> = of(this.artists);
  // stages$: Observable<Stage[]> = of(this.stages);

  @ViewChild('scrollableContainer', { static: false }) scrollableContainer!: ElementRef;

  @Input() selectedDay: string = 'friday';
  stage: number = 1;

  constructor(
    private timeSlotService: TimeSlotService,
    private artistService: ArtistService,
    private stageService: StageService,
    private router: Router
    
  ) { }

  // artistsWithTimes$: Observable<{ artist: Artist; startTime: Date | null; endTime: Date | null }[]> = combineLatest([
  //   this.artists$,
  //   this.timeSchedules$
  // ]).pipe(
  //   map(([artists, timeSchedules]) =>
  //     artists.map(artist => {
  //       const schedule = timeSchedules.find(schedule => schedule.artistId === artist.artistId);
  //       return {
  //         artist,
  //         startTime: schedule?.startTime || null,
  //         endTime: schedule?.endTime || null
  //       };
  //     })
  //   )
  // );

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
    const scale = 115; // Height of each hour block
    const baseValue = 67; // Top offset for the grid
  
    const hours = time.getHours();
    const minutes = time.getMinutes();
  
    const timeDifference = (hours - startHour) * scale + (minutes / 60) * scale;
  
    return baseValue + timeDifference;
  }
  
  calculateElementPositionAndHeight(start: Date, end: Date) {
    const startPosition = this.parseTime(start);
    const endPosition = this.parseTime(end);
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
