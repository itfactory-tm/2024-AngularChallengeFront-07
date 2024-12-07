import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineUpComponent } from './line-up.component';
import { ArtistService } from '../services/artist.service';
import { TimeSlotService } from '../services/timeSlot.service';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Artist } from '../interfaces/artist';
import { TimeSlot } from '../interfaces/timeSlot';

describe('LineUpComponent', () => {
  let component: LineUpComponent;
  let fixture: ComponentFixture<LineUpComponent>;
  let artistService: jasmine.SpyObj<ArtistService>;
  let timeSlotService: jasmine.SpyObj<TimeSlotService>;

  const mockArtists: Artist[] = [
    { artistId: '1', name: 'Artist 1', mail: 'artist1@example.com', description: 'Description 1', spotifyLink: '', apiCode: '', spotifyPhoto: '', genre: 'Rock', editionId: '1', editionName: 'Edition 1' },
    { artistId: '2', name: 'Artist 2', mail: 'artist2@example.com', description: 'Description 2', spotifyLink: '', apiCode: '', spotifyPhoto: '', genre: 'Pop', editionId: '1', editionName: 'Edition 1' }
  ];

  const mockTimeSlots: TimeSlot[] = [
    { timeSlotId: '1', artistId: '1', artistName: 'Artist 1', stageId: '1', stageName: 'Main Stage', startTime: new Date('2024-12-06T10:00:00Z'), endTime: new Date('2024-12-06T11:00:00Z') },
    { timeSlotId: '2', artistId: '2', artistName: 'Artist 2', stageId: '2', stageName: 'Second Stage', startTime: new Date('2024-12-06T12:00:00Z'), endTime: new Date('2024-12-06T13:00:00Z') }
  ];

  beforeEach(async () => {
    const artistServiceSpy = jasmine.createSpyObj('ArtistService', ['getArtists']);
    const timeSlotServiceSpy = jasmine.createSpyObj('TimeSlotService', ['getTimeSlots']);

    await TestBed.configureTestingModule({
      imports: [LineUpComponent],
      providers: [
        { provide: ArtistService, useValue: artistServiceSpy },
        { provide: TimeSlotService, useValue: timeSlotServiceSpy },
        provideRouter([]),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    artistService = TestBed.inject(ArtistService) as jasmine.SpyObj<ArtistService>;
    timeSlotService = TestBed.inject(TimeSlotService) as jasmine.SpyObj<TimeSlotService>;

    artistService.getArtists.and.returnValue(of(mockArtists));
    timeSlotService.getTimeSlots.and.returnValue(of(mockTimeSlots));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load artists and time slots on init', () => {
    component.ngOnInit();
    expect(component.artists).toEqual(mockArtists);
    expect(component.timeSlots).toEqual(mockTimeSlots);
  });

  it('should group artists by day', () => {
    component.groupBy('day');
    expect(Object.keys(component.groupedArtists)).toContain('Friday (06/12/2024)');
  });

  it('should group artists by genre', () => {
    component.groupBy('genre');
    expect(Object.keys(component.groupedArtists)).toContain('Rock');
    expect(Object.keys(component.groupedArtists)).toContain('Pop');
  });

  it('should group artists by stage', () => {
    component.groupBy('stage');
    expect(Object.keys(component.groupedArtists)).toContain('Main Stage');
    expect(Object.keys(component.groupedArtists)).toContain('Second Stage');
  });

  it('should update filter and displayed groups', () => {
    component.updateFilter('genre');
    expect(component.selectedFilter).toBe('genre');
    expect(Object.keys(component.displayedGroups)).toContain('Rock');
    expect(Object.keys(component.displayedGroups)).toContain('Pop');
  });
});
