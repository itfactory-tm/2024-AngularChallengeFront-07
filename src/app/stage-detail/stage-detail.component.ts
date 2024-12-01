import { Component, OnInit } from '@angular/core';
import { StageComponent } from '../stage/stage.component';
import { Stage } from '../interfaces/stage';
import { StageService } from '../services/stage.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-stage-detail',
  standalone: true,
  imports: [CommonModule, StageComponent],
  templateUrl: './stage-detail.component.html',
  styleUrl: './stage-detail.component.css'
})
export class StageDetailComponent implements OnInit {
  stage!: Stage;
  errorMessage: string | null = null;


  constructor(private stageService: StageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Using switchMap to fetch the stage from the service based on the ID
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const stageId = params.get('id');
          if (!stageId) {
            this.errorMessage = 'Stage ID is missing in the route.';
            return [];
          }
          return this.stageService.getStageById(stageId);
        })
      )
      .subscribe({
        next: stage => {
          if (stage) {
            this.stage = stage;
          } else {
            this.errorMessage = 'Stage not found.';
          }
        },
        error: err => {
          this.errorMessage = `Error loading stage: ${err.message}`;
        }
      });
  }
}
