import { Component, OnInit } from '@angular/core';
import { TimeSlotService } from '../../services/timeSlot.service';
import { Observable } from 'rxjs';
import { TimeSlot } from '../../interfaces/timeSlot';
import { Router } from '@angular/router';
import {AsyncPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-timeSlot-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './time-slot-list.component.html',
  styleUrl: './time-slot-list.component.css',
})
export class TimeSlotListComponent implements OnInit {
  timeSlots$: Observable<TimeSlot[]> = new Observable<TimeSlot[]>();
  errorMessage: string = '';

  constructor(private timeSlotService: TimeSlotService, private router: Router) { }
  ngOnInit(): void {
    this.getTimeSlots();
  }

  getTimeSlots() {
    this.timeSlots$ = this.timeSlotService.getTimeSlots();
  }
  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/timeSlot/form'], { state: { mode: 'add' } });
  }

  edit(id: string) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/timeSlot/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: string) {
    this.timeSlotService.deleteTimeSlot(id).subscribe({
      next: (v) => this.getTimeSlots(),
      error: (e) => (this.errorMessage = e.message),
    });
  }
}
