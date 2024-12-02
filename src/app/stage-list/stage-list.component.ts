import { Component } from '@angular/core';
import { Stage } from '../interfaces/stage';
import { StageService } from '../services/stage.service';
import { StageComponent } from '../stage/stage.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-stage-list',
  standalone: true,
  imports: [StageComponent, AsyncPipe],
  templateUrl: './stage-list.component.html',
  styleUrl: './stage-list.component.css'
})
export class StageListComponent {
  stages$: Observable<Stage[]> = new Observable<Stage[]>();


  constructor(private stageService: StageService) { }

  ngOnInit(): void {
    this.stages$ = this.stageService.getStages();
  }
}
