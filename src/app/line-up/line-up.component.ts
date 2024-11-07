import { Component,ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { Artist } from '../interfaces/artist';
import {Stage} from '../interfaces/stage';
import { ArtistService } from '../services/artist.service';
import { ArtistComponent } from '../artist/artist.component';
import { Router } from '@angular/router';
import { StageService } from '../services/stage.service';
import { CommonModule } from '@angular/common';
import { TimeScheduleComponent } from '../time-schedule/time-schedule.component';

@Component({
  selector: 'app-line-up',
  standalone: true,
  imports: [ArtistComponent, TimeScheduleComponent, CommonModule],
  templateUrl: './line-up.component.html',
  styleUrl: './line-up.component.css'
})
export class LineUpComponent {
  view: String = "artists";
  artists: Artist[] = [];
  stages: Stage[] = [];
  selectedDay: string = 'vrijdag';
  times: string[] = [
    '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', 
    '19:00', '20:00', '21:00', '22:00', '23:00', '24:00', '01:00', '02:00', 
    '03:00', '04:00'
  ];
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

  setDay(day:string){
    this.selectedDay = day;
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
