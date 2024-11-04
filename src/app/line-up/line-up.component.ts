import { Component,ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { Artist } from '../artist';
import {Stage} from '../stage';
import { ArtistService } from '../artist.service';
import { ArtistComponent } from '../artist/artist.component';
import { Router } from '@angular/router';
import { StageService } from '../stage.service';

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
  stages: Stage[] = [];
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  constructor(private router: Router, private artistService: ArtistService, private stageService: StageService) { }

  ngOnInit(): void {
    this.artists = this.artistService.getArtists();
    this.stages = this.stageService.getStages();
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
  sortByList(){}
  sortByAz(){}
  sortByGenre(){}
  sortByDay(day: String){
    switch(day){
      case "vrijdag":
        this.artists = this.artistService.getArtists(); //change to use timeservice and filter artists by day
      break;
      case "zaterdag":
        this.artists = this.artistService.getArtists();
      break;
      case "zondag":
        this.artists = this.artistService.getArtists();
      break;
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
