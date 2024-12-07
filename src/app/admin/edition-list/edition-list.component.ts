import { Component, OnInit } from '@angular/core';
import { EditionService } from '../../services/edition.service';
import { Observable } from 'rxjs';
import { Edition } from '../../interfaces/edition';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-edition-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './edition-list.component.html',
  styleUrl: './edition-list.component.css',
})
export class EditionListComponent implements OnInit {
  editions$: Observable<Edition[]> = new Observable<Edition[]>();
  errorMessage: string = '';

  constructor(private editionService: EditionService, private router: Router) {}
  ngOnInit(): void {
    this.getEditions();
  }

  getEditions() {
    this.editions$ = this.editionService.getEditions();
  }
  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/edition/form'], { state: { mode: 'add' } });
  }

  edit(id: string) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/edition/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: string) {
    this.editionService.deleteEdition(id).subscribe({
      next: (v) => this.getEditions(),
      error: (e) => (this.errorMessage = e.message),
    });
  }
}

