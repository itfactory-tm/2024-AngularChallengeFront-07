import { Injectable } from '@angular/core';
import { Stage } from '../interfaces/stage';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {v4 as uuidv4} from "uuid";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class StageService {
  constructor(private httpClient : HttpClient) {}
  private apiUrl = `${environment.api_url}/Stages`;
  getStages(): Observable<Stage[]> {
    return this.httpClient.get<Stage[]>(this.apiUrl);
  }

  getStageById(id: string): Observable<Stage> {
    return this.httpClient.get<Stage>(`${this.apiUrl}/${id}`);
  }

  postStage(stage: Stage): Observable<Stage> {
    stage.stageId = uuidv4(); // Generate a new UUID
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Stage>(`${this.apiUrl}/`, stage, {headers: headers});
  }

  putStage(id: string, stage: Stage): Observable<Stage> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Stage>(`${this.apiUrl}/${id}`, stage, {headers: headers});
  }

  deleteStage(id: string): Observable<Stage> {
    return this.httpClient.delete<Stage>(`${this.apiUrl}/${id}`);
  }
}
// getStages(): Stage[] {
//   return this.stages;
// }

// getStageById(id: number): Stage | null {
//   return this.stages.find(a => a.id === id) ?? null;
// }

// getStageSize(size: number): string {
//   if (size >= 100) return 'Large';
//   if (size >= 80) return 'Medium';
//   return 'Small';
// }

// getStageHeight(size: number): string {
//   return size >= 100 ? '5ft' : '4ft';
// }
// private stages: Stage[] = [
//   {
//     id: 1,
//     name: "Main Frit Stage",
//     location: { latitude: 52.3676, longitude: 4.9041 },
//     size: 120,
//     imageUrl: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     imageCaption: "Main stage",
//     description: "Our largest stage, hosting headliners and major acts. Experience unforgettable performances with state-of-the-art sound and lighting.",
//   },
//   {
//     id: 2,
//     name: "Currywurst Stage",
//     location: { latitude: 52.3680, longitude: 4.9045 },
//     size: 89,
//     imageUrl: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     imageCaption: "Currywurst Stage",
//     description: "A vibrant stage for up-and-coming artists and eclectic performances. Discover new favorites in an intimate setting.",
//   },
//   {
//     id: 3,
//     name: "Bitterbal Stage",
//     location: { latitude: 52.3672, longitude: 4.9038 },
//     size: 71,
//     imageUrl: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     imageCaption: "Bitterbal Stage",
//     description: "Our cozy stage for acoustic sets and indie artists. Get up close and personal with emerging talent in a laid-back atmosphere.",
//   },
//   {
//     id: 4,
//     name: "Stage 4",
//     location: { latitude: 52.3672, longitude: 4.9038 },
//     size: 71,
//     imageUrl: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     imageCaption: "Bitterbal Stage",
//     description: "Our cozy stage for acoustic sets and indie artists. Get up close and personal with emerging talent in a laid-back atmosphere.",
//   },
//   {
//     id: 5,
//     name: "Stage 5",
//     location: { latitude: 52.3672, longitude: 4.9038 },
//     size: 71,
//     imageUrl: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     imageCaption: "Bitterbal Stage",
//     description: "Our cozy stage for acoustic sets and indie artists. Get up close and personal with emerging talent in a laid-back atmosphere.",
//   },
//   {
//     id: 6,
//     name: "Stage 6",
//     location: { latitude: 52.3672, longitude: 4.9038 },
//     size: 71,
//     imageUrl: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     imageCaption: "Bitterbal Stage",
//     description: "Our cozy stage for acoustic sets and indie artists. Get up close and personal with emerging talent in a laid-back atmosphere.",
//   },
// ];
