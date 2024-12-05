import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../../interfaces/timeSlot';
import { Router } from '@angular/router';
import { TimeSlotService } from '../../services/timeSlot.service';
import { EditionService } from '../../services/edition.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Edition } from '../../interfaces/edition';
import { Stage } from '../../interfaces/stage';
import { AsyncPipe } from '@angular/common';
import {Artist} from "../../interfaces/artist";
import {StageService} from "../../services/stage.service";
import {ArtistService} from "../../services/artist.service";

@Component({
  selector: 'app-timeSlot-form',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './time-slot-form.component.html',
  styleUrl: './time-slot-form.component.css',
})
export class TimeSlotFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  timeSlotId: string = '';

  stages$: Stage[] = [];
  artists$: Artist[] = [];
  timeSlot: TimeSlot = {
    timeSlotId: '',
    startTime: new Date(),
    endTime: new Date(),
    artistId: '',
    artistName: '',
    stageId: '',
    stageName: '',
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private timeSlotService: TimeSlotService,

    private stageService: StageService,
    private artistService: ArtistService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit';
    this.timeSlotId = state['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }
  ngOnInit(): void {

    this.artistService.getArtists().subscribe((artists)=>{
      this.artists$ = artists;
    })
    this.stageService.getStages().subscribe((stages)=>{
      this.stages$ = stages;
    })
    if (this.timeSlotId != null) {
      this.timeSlotService.getTimeSlotById(this.timeSlotId).subscribe((result) => {
        this.timeSlot = result;
        if(this.isEdit){
          this.timeSlot.stageId;
          this.timeSlot.artistId;
          this.timeSlot.endTime = new Date();
          this.timeSlot.startTime = new Date();
        }
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.timeSlotService.postTimeSlot(this.timeSlot).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/timeSlot'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
    if (this.isEdit) {
      this.timeSlotService.putTimeSlot(this.timeSlotId, this.timeSlot).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/timeSlot'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
  }
}
