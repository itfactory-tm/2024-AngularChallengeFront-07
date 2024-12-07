import { TestBed } from '@angular/core/testing';
import { v4 as uuidv4 } from 'uuid';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { StageService } from './stage.service';
import { Stage } from '../interfaces/stage';

describe('StageService', () => {
  let service: StageService;
  let httpMock: HttpTestingController;
  const mockStage: Stage = {
    stageId: uuidv4(), 
    name: 'Main Stage',
    locationId: '1',
    locationName: 'Central Park',
    timeSlotsRanges: [],
    photos: ['https://example.com/photo1.jpg']
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StageService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(StageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch stages', () => {
    const mockStages: Stage[] = [mockStage];

    service.getStages().subscribe((stages) => {
      expect(stages).toEqual(mockStages);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockStages);
  });

  it('should fetch a stage by ID', () => {
    service.getStageById(mockStage.stageId).subscribe((stage) => {
      expect(stage).toEqual(mockStage);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockStage.stageId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStage);
  });

  it('should add a stage', () => {
    service.postStage(mockStage).subscribe((stage) => {
      expect(stage).toEqual(mockStage);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.stageId).toBeTruthy(); // Ensures the UUID is set
    req.flush(mockStage);
  });

  it('should update a stage', () => {
    const updatedStage = { ...mockStage, name: 'Updated Stage' };

    service.putStage(mockStage.stageId, updatedStage).subscribe((stage) => {
      expect(stage).toEqual(updatedStage);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockStage.stageId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedStage);
    req.flush(updatedStage);
  });

  it('should delete a stage', () => {
    service.deleteStage(mockStage.stageId).subscribe((response) => {
      expect(response).toBeFalsy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockStage.stageId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
