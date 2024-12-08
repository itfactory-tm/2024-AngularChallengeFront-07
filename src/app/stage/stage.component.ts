import { Component, Input, OnInit } from '@angular/core';
import { Stage } from '../interfaces/stage';
import { StageService } from '../services/stage.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TimeSlot } from '../interfaces/timeSlot';
import { TimeSlotService } from '../services/timeSlot.service';

@Component({
  selector: 'app-stage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css'],
})
export class StageComponent implements OnInit {
  @Input() stage!: Stage;
  @Input() isDetail: boolean = false;
  timeslots: TimeSlot[] = [];
  photoExists: boolean = false;

  constructor(
    private timeSlotService: TimeSlotService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.isDetail && this.stage) {
      this.timeSlotService.getTimeSlots().subscribe((timeslots) => {
        this.timeslots = timeslots.filter(
          (ts) => ts.stageId === this.stage.stageId
        );
      });
    } else if (!this.isDetail) {
      this.timeSlotService.getTimeSlots().subscribe((timeslots) => {
        this.timeslots = timeslots;
      });
    }

    this.checkPhotoExists();
  }

  getPhotoUrl(stage: Stage): string {
    const stageKeywords = [
      'Main', 'Pop', 'Rock', 'Dance/Electronic', 'R&B/Soul', 'Country',
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

  detail(id: string) {
    this.router.navigate(['/stage', id]);
  }

  goBack() {
    window.history.back();
  }
}
