import { Component, OnInit } from '@angular/core';
import { StageComponent } from '../stage/stage.component';
import { Stage } from '../interfaces/stage';
import { StageService } from '../services/stage.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stage-detail',
  standalone: true,
  imports: [CommonModule, StageComponent],
  templateUrl: './stage-detail.component.html',
  styleUrl: './stage-detail.component.css'
})
export class StageDetailComponent implements OnInit {

  stage!: Stage;

  constructor(private stageService: StageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const stageId = this.route.snapshot.paramMap.get('id');
    if (stageId != null) {
      let stageTemp = this.stageService.getStageById(+stageId) ?? null;
      if (stageTemp  != null) {
        this.stage = stageTemp ;
      }
    }
  }
}
