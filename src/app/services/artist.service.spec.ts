import { TestBed } from '@angular/core/testing';
import {v4 as uuidv4} from "uuid";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ArtistService} from "./artist.service";
import {Artist} from "../interfaces/artist";

describe('ArtistService', () => {
  let service: ArtistService;
  let httpMock: HttpTestingController;
  const mockArtist: Artist = {
    artistId: uuidv4(), // Generated using uuidv4()
    name: 'Artist Name',
    mail: 'artist@example.com',
    description: 'Artist description',
    spotifyLink: 'https://spotify.com/artist',
    apiCode: '12345',
    spotifyPhoto: 'https://spotify.com/artist/photo',
    genre: 'Rock',
    editionId: '1',
    editionName: 'Edition 1'
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistService]
    });
    service = TestBed.inject(ArtistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch food trucks', () => {
    const mockArtists: Artist[] = [mockArtist];

    service.getArtists().subscribe((artists) => {
      expect(artists).toEqual(mockArtists);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockArtists);
  });

  it('should fetch a food truck by ID', () => {
    service.getArtistById(mockArtist.artistId).subscribe((artist) => {
      expect(artist).toEqual(mockArtist);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockArtist.artistId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArtist);
  })

  it('should add a food truck', () => {
    service.postArtist(mockArtist).subscribe((artist) => {
      expect(artist).toEqual(mockArtist);
    });
    const req = httpMock.expectOne(`${service['apiUrl']}/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.artistId).toBeTruthy(); // Ensures the UUID is set
    req.flush(mockArtist);

  });

  it('should update a food truck', () => {
    const updatedArtist = {...mockArtist, name: 'Plot'};

    service.putArtist(mockArtist.artistId, updatedArtist).subscribe((artist) => {
      expect(artist).toEqual(updatedArtist);
    })

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockArtist.artistId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedArtist);
    req.flush(updatedArtist);
  });

  it('should delete a food truck', () => {
    service.deleteArtist(mockArtist.artistId).subscribe((response) => {
      expect(response).toBeFalsy(); // Expecting no response content on delete
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockArtist.artistId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
