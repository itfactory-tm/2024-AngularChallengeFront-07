import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Stage } from '../interfaces/stage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StageService {
  private apiUrl = 'http://localhost:8080/api/stages';

  constructor(private httpClient: HttpClient) {} 

  getStages(): Observable<Stage[]> {
    return this.httpClient.get<Stage[]>(this.apiUrl);
  }

  getStageById(id: string): Observable<Stage> {
    return this.httpClient.get<Stage>(`${this.apiUrl}/${id}`);
  }

  postStage(stage: Stage): Observable<Stage> {
    return this.httpClient.post<Stage>(this.apiUrl, stage);
  }

  putStage(id: string, stage: Stage): Observable<Stage> {
    return this.httpClient.put<Stage>(`${this.apiUrl}/${id}`, stage);
  }

  deleteStage(id: string): Observable<Stage> {
    return this.httpClient.delete<Stage>(`${this.apiUrl}/${id}`);
  }
}
