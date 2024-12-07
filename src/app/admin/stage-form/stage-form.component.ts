import { Component, OnInit } from '@angular/core';
import { Stage } from '../../interfaces/stage';
import { Router } from '@angular/router';
import { StageService } from '../../services/stage.service';
import { EditionService } from '../../services/edition.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import {Location} from "../../interfaces/location";
import {LocationService} from "../../services/location.service";

@Component({
  selector: 'app-stage-form',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './stage-form.component.html',
  styleUrl: './stage-form.component.css',
})
export class StageFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  stageId: string = '';
  locations$: Location[] = [];

  stage: Stage = {
    stageId: '',
    name: '',
    locationId: '',
    locationName: '',
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private stageService: StageService,
    private locationService:LocationService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit';
    this.stageId = state['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }
  ngOnInit(): void {
    this.locationService.getLocations().subscribe(locations => {
      this.locations$ = locations;
    })
    if (this.stageId != null) {
      this.stageService.getStageById(this.stageId).subscribe((result) => {
        this.stage = result;
        console.log('Stage before binding:', this.stage);
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.stageService.postStage(this.stage).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/stage'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
    if (this.isEdit) {
      this.stageService.putStage(this.stageId, this.stage).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/stage'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
