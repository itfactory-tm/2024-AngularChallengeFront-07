import { Injectable } from '@angular/core';
import { Stage } from '../interfaces/stage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root',
})
export class StageService {
  constructor(private httpClient: HttpClient) { }
  private apiUrl = `${environment.api_url}/Stages`; 

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
