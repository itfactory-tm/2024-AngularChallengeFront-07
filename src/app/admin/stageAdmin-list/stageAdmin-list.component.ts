import { Component, OnInit } from '@angular/core';
import { StageService } from '../../services/stage.service';
import {catchError, forkJoin, map, Observable, of} from 'rxjs';
import { Stage } from '../../interfaces/stage';
import { Router } from '@angular/router';
import {AsyncPipe, CommonModule} from '@angular/common';
import {TimeSlotService} from "../../services/timeSlot.service";

@Component({
  selector: 'app-stageAdmin-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './stageAdmin-list.component.html',
  styleUrl: './stageAdmin-list.component.css',
})
export class StageAdminListComponent implements OnInit {
  stages$: Observable<Stage[]> = new Observable<Stage[]>();
  errorMessage: string = '';

  constructor(private stageService: StageService, private timeSlotService:TimeSlotService,private router: Router) {}
  ngOnInit(): void {
    this.getStages();
  }

  getStages() {
    this.stages$ = forkJoin({
      stages: this.stageService.getStages(),
      timeSlots: this.timeSlotService.getTimeSlots(),
    }).pipe(
      map(({stages,timeSlots})=>{
        return stages.map((stage) => ({
          ...stage,
          timeSlots: timeSlots.filter(
            (timeSlot) => timeSlot.stageId === stage.stageId,
          ),
        }));
      }),
      catchError((err) => {
        console.error('Error fetching data:', err);
        return of([]); // Handle errors gracefully
      })
    )
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
