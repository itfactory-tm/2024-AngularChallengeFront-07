import { Injectable } from '@angular/core';
import { Dag } from '../interfaces/dag';

@Injectable({
  providedIn: 'root'
})
export class DagService {

  private dag: Dag[] = [];

  constructor() { 

    let vrijdag : Dag = {
      dagId: 1,
      naam: "Vrijdag",
      startDatum: new Date('2024-10-25T10:30:00'),
      eindDatum: new Date('2024-10-25T10:30:00'),
    };

    let zaterdag : Dag = {
      dagId: 2,
      naam: "Zaterdag",
      startDatum: new Date('2024-10-26T10:30:00'),
      eindDatum: new Date('2024-10-26T10:30:00')
    };

    let zondag : Dag = {
      dagId: 3,
      naam: "Zondag",
      startDatum: new Date('2024-10-27T10:30:00'),
      eindDatum: new Date('2024-10-27T10:30:00')
    };

    let weekend : Dag = {
      dagId: 4,
      naam: "Weekend",
      startDatum: new Date('2024-10-25T10:30:00'),
      eindDatum: new Date('2024-10-27T10:30:00')
    };

    this.dag.push(vrijdag);
    this.dag.push(zaterdag);
    this.dag.push(zondag);
    this.dag.push(weekend);
  }

  getDays(): Dag[] {
    return this.dag;
  }
}
