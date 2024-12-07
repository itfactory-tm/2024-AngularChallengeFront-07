import { Component, OnInit } from '@angular/core';
import {map, Observable} from 'rxjs';
import { Sponsor } from '../../interfaces/sponsor';
import { SponsorService } from '../../services/sponsor.service';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-sponsor-list',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, FormsModule],
  templateUrl: './sponsor-list.component.html',
  styleUrl: './sponsor-list.component.css',
})
export class SponsorListComponent implements OnInit {
  sponsors$: Observable<Sponsor[]> = new Observable<Sponsor[]>();
  filteredSponsors$: Observable<Sponsor[]> = new Observable<Sponsor[]>();
  searchTerm: string = '';
  errorMessage: string = '';

  constructor(private sponsorService: SponsorService, private router: Router) {}

  ngOnInit(): void {
    this.getSponsors();
  }

  getSponsors() {
    this.sponsors$ = this.sponsorService.getSponsors();
    this.filteredSponsors$ = this.sponsors$;
  }

  filteredSponsor(){
    this.filteredSponsors$ = this.sponsors$.pipe(
      map(sponsors =>
      sponsors.filter(sponsor =>
      sponsor.sponsorName.toLowerCase().includes(this.searchTerm.toLowerCase())))
    )
  }

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
  add() {
    this.router.navigate(['admin/sponsor/form'], { state: { mode: 'add' } });
  }

  edit(id: string) {
    this.router.navigate(['admin/sponsor/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: string) {
    this.sponsorService.deleteSponsor(id).subscribe({
      next: (v) => this.getSponsors(),
      error: (e) => (this.errorMessage = e.message),
    });
  }
}
