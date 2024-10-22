import { Component,ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { Artist } from '../artist';
import { ArtistService } from '../artist.service';
import { ArtistComponent } from '../artist/artist.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-line-up',
  standalone: true,
  imports: [ArtistComponent],
  templateUrl: './line-up.component.html',
  styleUrl: './line-up.component.css'
})
export class LineUpComponent {
  view: String = "artists";
  artists: Artist[] = [];
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  constructor(private router: Router, private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artists = this.artistService.getArtists();
  }

  changeView(changeViewTo: String){
    switch(changeViewTo){
      case "artists":
        this.view = "artists"
      break;
      case "lineup":
        this.view = "lineup"
      break
    }
  }
  detail(id: number) {
    this.router.navigate(['/artist', id]);
  }
  scrollLeft(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollBy({
        left: -250,
        behavior: 'smooth'
      });
    }
  }
  scrollRight(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollBy({
        left: 250,
        behavior: 'smooth'
      });
    }
  }
}
