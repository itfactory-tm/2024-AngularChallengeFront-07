import { Component, Input } from '@angular/core';
import { Stage } from '../interfaces/stage';
import { StageService } from '../services/stage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.css'
})
export class StageComponent {
  @Input() stage!: Stage;

  constructor(private stageService: StageService) {}

  getStageSize(): string {
    return this.stageService.getStageSize(this.stage.size);
  }

  getStageHeight(): string {
    return this.stageService.getStageHeight(this.stage.size);
  }
}
