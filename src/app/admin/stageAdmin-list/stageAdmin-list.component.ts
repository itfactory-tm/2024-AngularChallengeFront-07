import { Component, OnInit } from '@angular/core';
import { StageService } from '../../services/stage.service';
import { Observable } from 'rxjs';
import { Stage } from '../../interfaces/stage';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-stageAdmin-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './stageAdmin-list.component.html',
  styleUrl: './stageAdmin-list.component.css',
})
export class StageAdminListComponent implements OnInit {
  stages$: Observable<Stage[]> = new Observable<Stage[]>();
  errorMessage: string = '';

  constructor(private stageService: StageService, private router: Router) {}
  ngOnInit(): void {
    this.getStages();
  }

  getStages() {
    this.stages$ = this.stageService.getStages();
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
