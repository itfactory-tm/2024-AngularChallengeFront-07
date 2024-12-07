import { Component, OnInit } from '@angular/core';
import { StageService } from '../../services/stage.service';
import {Observable} from 'rxjs';
import { Stage } from '../../interfaces/stage';
import { Router } from '@angular/router';
import {AsyncPipe, CommonModule} from '@angular/common';
import {TimeSlotService} from "../../services/timeSlot.service";
import { TimeSlot } from '../../interfaces/timeSlot';

@Component({
  selector: 'app-stageAdmin-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './stageAdmin-list.component.html',
  styleUrl: './stageAdmin-list.component.css',
})
export class StageAdminListComponent implements OnInit {
  stages$: Observable<Stage[]> = new Observable<Stage[]>();
  timeSlots$: Observable<TimeSlot[]> = new Observable<TimeSlot[]>();
  timeSlotsByStage: { [key: string]: TimeSlot[] } = {};
  errorMessage: string = '';

  constructor(private stageService: StageService, private timeSlotService:TimeSlotService,private router: Router) {}
  ngOnInit(): void {
    this.getStages();
    this.getTimeSlots();
    
  }

  getStages() {
    this.stages$ = this.stageService.getStages();

  }
  getTimeSlots(){
    this.timeSlots$ = this.timeSlotService.getTimeSlots();

    this.timeSlots$.subscribe((slots) => {
      this.timeSlotsByStage = slots.reduce((acc, slot) => {
        if (!acc[slot.stageId]) acc[slot.stageId] = [];
        acc[slot.stageId].push(slot);
        return acc;
      }, {} as { [key: string]: TimeSlot[] });
    });
  }
  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/stage/form'], { state: { mode: 'add' } });
  }

  edit(id: string) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/stage/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: string) {
    this.stageService.deleteStage(id).subscribe({
      next: (v) => this.getStages(),
      error: (e) => (this.errorMessage = e.message),
    });
  }
}
