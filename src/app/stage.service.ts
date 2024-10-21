import { Injectable } from '@angular/core';
import { Stage } from './stage';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private stages: Stage[] = [
    {
      id: 1,
      name: "Main Frit Stage",
      size: "Large",
      imageUrl: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      imageCaption: "Main stage",
      description: "Our largest stage, hosting headliners and major acts. Experience unforgettable performances with state-of-the-art sound and lighting.",
    },
    {
      id: 2,
      name: "Currywurst Stage",
      size: "Medium",
      imageUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      imageCaption: "Currywurst Stage",
      description: "A vibrant stage for up-and-coming artists and eclectic performances. Discover new favorites in an intimate setting.",
    },
    {
      id: 3,
      name: "Bitterbal Stage",
      size: "Small",
      imageUrl: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      imageCaption: "Bitterbal Stage",
      description: "Our cozy stage for acoustic sets and indie artists. Get up close and personal with emerging talent in a laid-back atmosphere.",
    },
  ];

  getStages(): Stage[] {
    return this.stages;
  }

  getStageById(id: number): Stage | null {
    return this.stages.find(a => a.id === id) ?? null;
  }
}
