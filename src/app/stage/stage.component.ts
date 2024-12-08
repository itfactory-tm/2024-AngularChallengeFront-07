import { Component, Input, OnInit } from '@angular/core';
import { Stage } from '../interfaces/stage';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TimeSlot } from '../interfaces/timeSlot';
import { TimeSlotService } from '../services/timeSlot.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.css',
  providers: [DatePipe]
})
export class StageComponent implements OnInit {
  @Input() stage!: Stage;
  @Input() isDetail: boolean = false;
  timeslots: TimeSlot[] = [];
  photoExists: boolean = false;

  constructor(
    private timeSlotService: TimeSlotService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    if (this.isDetail && this.stage) {
      this.timeSlotService.getTimeSlots().subscribe((timeslots) => {
        this.timeslots = timeslots.filter(
          (ts) => ts.stageId === this.stage.stageId
        );
        this.sortTimeslotsByDayName();
      });
    } else if (!this.isDetail) {
      this.timeSlotService.getTimeSlots().subscribe((timeslots) => {
        this.timeslots = timeslots;
        this.sortTimeslotsByDayName();
      });
    }

    this.checkPhotoExists();
  }

  getPhotoUrl(stage: Stage): string {
    const stageKeywords = [
      'Main', 'Pop', 'Rock', 'Electronic', 'R&B', 'Country',
      'Jazz', 'Reggae', 'Metal', 'Punk'
    ];
    const keywords = stageKeywords.map(keyword => keyword.toLowerCase());
    const stageName = stage.name.toLowerCase();
    const locationName = stage.locationName.toLowerCase();

    let keyword = keywords.find(kw => stageName.includes(kw) || locationName.includes(kw));
    if (keyword) {
      keyword = keyword.replace('/', '-');
      return `assets/stages/${keyword}.webp`;
    }

    return `assets/stages/stage.webp`; 
  }

  checkPhotoExists(): void { 
    const photoUrl = this.getPhotoUrl(this.stage); 
    fetch(photoUrl, { method: 'HEAD' }) 
    .then(response => { this.photoExists = response.ok; 
    }) 
    .catch(() => { this.photoExists = false; 
    }); 
  }

  getDayName(date: Date): string {
    return this.datePipe.transform(date, 'EEEE') || '';
  }

  sortTimeslotsByDayName(): void {
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.timeslots.sort((a, b) => {
      const dayA = this.getDayName(a.startTime);
      const dayB = this.getDayName(b.startTime);
      return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
    });
  }

  detail(id: string) {
    this.router.navigate(['/stage', id]);
  }

  goBack() {
    window.history.back();
  }
}

