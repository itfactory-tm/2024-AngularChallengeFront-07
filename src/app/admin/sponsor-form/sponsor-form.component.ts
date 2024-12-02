import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Edition } from '../../interfaces/edition';
import { Sponsor } from '../../interfaces/sponsor';
import { Router } from '@angular/router';
import { SponsorService } from '../../services/sponsor.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { info } from 'autoprefixer';
import { EditionService } from '../../services/edition.service';

@Component({
  selector: 'app-sponsor-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sponsor-form.component.html',
  styleUrl: './sponsor-form.component.css',
})
export class SponsorFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  sponsorId: string = '';
  editions$: Edition[] = [];

  sponsor: Sponsor = {
    sponsorId: '',
    sponsorName: '',
    sponsorMail: '',
    sponsoredItem: '',
    amount: 0,
    sponsorLogo: '',
    editionId: '',
    editionName: '',
  };

  selectedFile: File | null = null; // The selected file

  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private sponsorService: SponsorService,
    private editionService: EditionService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit';
    this.sponsorId = state['id'];
    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }

  ngOnInit(): void {
    this.editionService.getEditions().subscribe((editions)=>{
      this.editions$ = editions;
    })
    if (this.sponsorId != null) {
      this.sponsorService.getSponsorById(this.sponsorId).subscribe((result) => {
        this.sponsor = result;
      });
    }

  }



  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.sponsor.sponsorLogo = `public/images/sponsors/${this.selectedFile.name}`;
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.sponsorService.postSponsor(this.sponsor).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/sponsor'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
    if (this.isEdit) {
      this.sponsorService.putSponsor(this.sponsorId, this.sponsor).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/sponsor'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
  }
}
