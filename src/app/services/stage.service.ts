import { Injectable } from '@angular/core';
import { Stage } from '../interfaces/stage';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StageService {
  constructor(private apiService: ApiService) {}

  getStages(): Observable<Stage[]> {
    return this.apiService.get<Stage[]>('Stages');
  }

  getStageById(id: string): Observable<Stage> {
    return this.apiService.getById<Stage>('Stages', id);
  }

  postStage(stage: Stage): Observable<Stage> {
    return this.apiService.post<Stage>('Stages', stage);
  }

  putStage(id: string, stage: Stage): Observable<Stage> {
    return this.apiService.put<Stage>('Stages', id, stage);
  }

  deleteStage(id: string): Observable<Stage> {
    return this.apiService.delete<Stage>('Stages', id);
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