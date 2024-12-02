import { Component, Input } from '@angular/core';
import { Stage } from '../interfaces/stage';
import { StageService } from '../services/stage.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.css'
})
export class StageComponent {
  @Input() stage!: Stage;
  @Input() isDetail: boolean = false;

  constructor(private stageService: StageService, private router: Router) {}

  // getStageSize(): string {
  //   return this.stageService.getStageSize(this.stage.size);
  // }

  // getStageHeight(): string {
  //   return this.stageService.getStageHeight(this.stage.size);
  // }

  detail(id: string) {
    this.router.navigate(['/stage', id]);
  }

  goBack() {
    window.history.back();
  }
}
