import { Injectable } from '@angular/core';
import { Stage } from '../interfaces/stage';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {v4 as uuidv4} from 'uuid';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root',
})
export class StageService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl = environment.api_url;
  getStages(): Observable<Stage[]> {
    return this.httpClient.get<Stage[]>(this.apiUrl);
  }

  getStageById(id: string): Observable<Stage> {
    return this.httpClient.get<Stage>(`${this.apiUrl}/${id}`);
  }

  postStage(stage: Stage): Observable<Stage> {
    stage.stageId = uuidv4()
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Stage>(`${this.apiUrl}/`, stage, {headers: headers, });
  }

  putStage(id: string, stage: Stage): Observable<Stage> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Stage>(`${this.apiUrl}/${id}`, stage, {headers: headers, });
  }

  deleteStage(id: string): Observable<Stage> {
    return this.httpClient.delete<Stage>(`${this.apiUrl}/${id}`);
  }
}
