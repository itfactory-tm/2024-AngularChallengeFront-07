import { Component } from '@angular/core';
import { Artist } from '../../interfaces/artist';
import { Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artist-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './artist-form.component.html',
  styleUrl: './artist-form.component.css'
})
export class ArtistFormComponent {
  isAdd: boolean = false;
  isEdit: boolean = false;
  artistId: number = 0;

  artist: Artist = {
    id: 0,
    name: '',
    genre: '',
    biography: '',
    imageUrl: '',
    spotifyId: ''
  };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  constructor(private router: Router, private artistService: ArtistService) {
    const state = this.router.getCurrentNavigation()?.extras.state || {};
    this.isAdd = state['mode'] === 'add';
    this.isEdit = state['mode'] === 'edit';
    this.artistId = +state['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.artistId != null && this.artistId > 0) {
      this.artistService.getArtistByIdApi(this.artistId).subscribe(result => {
        this.artist = result;
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.artistService.postArtist(this.artist).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/artist"),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isEdit) {
      this.artistService.putArtist(this.artistId, this.artist).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/artist"),
        error: (e) => this.errorMessage = e.message
      });
    }
  }
}
