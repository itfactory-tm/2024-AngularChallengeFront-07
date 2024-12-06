import { Component, OnInit } from '@angular/core';
import { Artist } from '../interfaces/artist';
import { TimeSlotService } from '../services/timeSlot.service';
import { ArtistService } from '../services/artist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistComponent } from '../artist/artist.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-line-up',
  standalone: true,
  imports: [ArtistComponent, CommonModule, FormsModule],
  templateUrl: './line-up.component.html',
  styleUrls: ['./line-up.component.css']
})
export class LineUpComponent implements OnInit {
  artists: Artist[] = [];
  timeSlots: any[] = [];
  groupedArtists: { [key: string]: Artist[] } = {};
  selectedFilter: string = 'day';
  displayedGroups: { [key: string]: Artist[] } = {};
  filters = [
    { label: 'Day', value: 'day' },
    { label: 'Genre', value: 'genre' },
    { label: 'Stage', value: 'stage' }
  ];
  genreKeywords = [
    'Pop', 'Rock', 'Hip-Hop', 'Dance/Electronic', 'R&B/Soul', 'Country',
    'Jazz', 'Classical', 'Reggae', 'Blues', 'Metal', 'Punk'
  ];

  constructor(
    private artistService: ArtistService,
    private timeSlotService: TimeSlotService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadArtists();
    this.loadTimeSlots();

    this.route.queryParams.subscribe((params) => {
      const filterFromQueryParams = params['filter'] || 'day';
      this.selectedFilter = filterFromQueryParams;
      this.groupBy(this.selectedFilter);
      this.updateDisplayedGroups();
    });
  }

  loadArtists(): void {
    this.artistService.getArtists().subscribe((data) => {
      this.artists = data;
      this.groupBy(this.selectedFilter); 
      this.updateDisplayedGroups();
    });
  }

  loadTimeSlots(): void {
    this.timeSlotService.getTimeSlots().subscribe((data) => {
      this.timeSlots = data;
      this.groupBy(this.selectedFilter);
      this.updateDisplayedGroups();
    });
  }

  groupBy(type: string): void {
    this.groupedArtists = {};
    if (type === 'day') {
      this.timeSlots.forEach((slot) => {
        const day = slot.startTime ? this.getDayFromTime(slot.startTime) : 'Day NA';
        this.addToGroup(day, slot.artistId);
      });
    } else if (type === 'genre') {
      this.artists.forEach((artist) => {
        const genre = this.mapGenreToKeyword(artist.genre || 'Genre NA');
        this.addToGroup(genre, artist.artistId);
      });
    } else if (type === 'stage') {
      this.timeSlots.forEach((slot) => {
        const stage = slot.stageName || 'Stage NA'; 
        this.addToGroup(stage, slot.artistId);
      });
    }
  }

  addToGroup(key: string, artistId: string): void {
    if (!this.groupedArtists[key]) {
      this.groupedArtists[key] = [];
    }
    const artist = this.artists.find((a) => a.artistId === artistId);
    if (artist) {
      this.groupedArtists[key].push(artist);
    }
  }

  updateFilter(filter: string): void {
    this.selectedFilter = filter;
    this.router.navigate([], { queryParams: { filter }, queryParamsHandling: 'merge' });
    this.groupBy(filter); 
    this.updateDisplayedGroups(); 
  }

  updateDisplayedGroups(): void {
    this.displayedGroups = this.groupedArtists;
  }

  getDayFromTime(time: string): string {
    const date = new Date(time);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const dayOfWeek = date.toLocaleDateString('en-US', options);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${dayOfWeek} (${day}/${month}/${year})`;
  }

  trackByFn(item: any): any {
    return item ? item.key : undefined;
  }

  mapGenreToKeyword(genre: string): string {
    const normalizedGenre = genre.toLowerCase();
    for (const keyword of this.genreKeywords) {
      if (normalizedGenre.includes(keyword.toLowerCase())) {
        return keyword;
      }
    }
    return genre; 
  }
}
