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
  styleUrl: './stage.component.css',
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

  checkPhotoExists(): void { 
    const photoUrl = `public/assets/stages/${this.stage.name}.jpg`; 
    this.checkFileExists(photoUrl).then(exists => { this.photoExists = exists; }); 
  } 
  checkFileExists(url: string): Promise<boolean> { 
    return fetch(url, { method: 'HEAD' }).then(response => response.ok) .catch(() => false); 
  }

  detail(id: string) {
    this.router.navigate(['/stage', id]);
  }

  goBack() {
    window.history.back();
  }
}
