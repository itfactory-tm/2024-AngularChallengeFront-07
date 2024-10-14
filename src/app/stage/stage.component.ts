import { Component,Input } from '@angular/core';
import { Stage } from '../stage';

@Component({
  selector: 'app-stage',
  standalone: true,
  imports: [],
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.css'
})
export class StageComponent {
  @Input() stage!: Stage;
}
