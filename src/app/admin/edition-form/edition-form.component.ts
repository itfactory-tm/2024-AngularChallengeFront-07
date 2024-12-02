import { Component, OnInit } from '@angular/core';
import { Edition } from '../../interfaces/edition';
import { Router } from '@angular/router';
import { EditionService } from '../../services/edition.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-edition-form',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './edition-form.component.html',
  styleUrl: './edition-form.component.css',
})
export class EditionFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  editionId: string = '';
  editions$: Observable<Edition[]> = new Observable<Edition[]>();

  edition: Edition = {
    editionId: '',
    editionName: '',
    adres: '',
    zipCode: '',
    municipality: '',
    phoneNr: '',
    mail: '',
    year: 0,
    ticketCount: 0,
    artistsNames: [],
    photos: [],
    articleNames: [],
    sponsorNames: [],
    foodtruckNames: [],
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private editionService: EditionService,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit';
    this.editionId = state['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }
  ngOnInit(): void {
    this.editions$ = this.editionService.getEditions();
    if (this.editionId != null) {
      this.editionService.getEditionById(this.editionId).subscribe((result) => {
        this.edition = result;
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.editionService.postEdition(this.edition).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/edition'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
    if (this.isEdit) {
      this.editionService.putEdition(this.editionId, this.edition).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/edition'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
  }
}

