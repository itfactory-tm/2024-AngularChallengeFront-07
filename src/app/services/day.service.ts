import { Injectable } from '@angular/core';
import { Day } from '../interfaces/day';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DayService {
  constructor(private apiService: ApiService) {}

  getDays(): Observable<Day[]> {
    return this.apiService.get<Day[]>('Days');
  }

  getDayById(id: string): Observable<Day> {
    return this.apiService.getById<Day>('Days', id);
  }

  postDay(day: Day): Observable<Day> {
    return this.apiService.post<Day>('Days', day);
  }

  putDay(id: string, day: Day): Observable<Day> {
    return this.apiService.put<Day>('Days', id, day);
  }

  deleteDay(id: string): Observable<Day> {
    return this.apiService.delete<Day>('Days', id);
  }
}


//   private dag: Dag[] = [];

//   constructor() { 

//     let vrijdag : Dag = {
//       dagId: 1,
//       naam: "Vrijdag",
//       startDatum: new Date('2024-10-25T10:30:00'),
//       eindDatum: new Date('2024-10-25T10:30:00'),
//     };

//     let zaterdag : Dag = {
//       dagId: 2,
//       naam: "Zaterdag",
//       startDatum: new Date('2024-10-26T10:30:00'),
//       eindDatum: new Date('2024-10-26T10:30:00')
//     };

//     let zondag : Dag = {
//       dagId: 3,
//       naam: "Zondag",
//       startDatum: new Date('2024-10-27T10:30:00'),
//       eindDatum: new Date('2024-10-27T10:30:00')
//     };

//     let weekend : Dag = {
//       dagId: 4,
//       naam: "Weekend",
//       startDatum: new Date('2024-10-25T10:30:00'),
//       eindDatum: new Date('2024-10-27T10:30:00')
//     };

//     this.dag.push(vrijdag);
//     this.dag.push(zaterdag);
//     this.dag.push(zondag);
//     this.dag.push(weekend);
//   }

//   getDays(): Dag[] {
//     return this.dag;
//   }
// }
