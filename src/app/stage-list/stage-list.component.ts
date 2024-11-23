import { Component } from '@angular/core';
import { Stage } from '../interfaces/stage';
import { StageService } from '../services/stage.service';
import { StageComponent } from '../stage/stage.component';


@Component({
  selector: 'app-stage-list',
  standalone: true,
  imports: [StageComponent],
  templateUrl: './stage-list.component.html',
  styleUrl: './stage-list.component.css'
})
export class StageListComponent {
  stages: Stage[] = [];

  constructor(private stageService: StageService) { }

  ngOnInit(): void {
    this.stages = this.stageService.getStages();
  }
}
