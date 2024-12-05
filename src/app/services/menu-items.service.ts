import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MenuItems} from "../interfaces/menu-items";
import { v4 as uuidv4 } from 'uuid';
import {environment} from "../../environments/environment"; // Import the uuid function

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  private apiUrl = `${environment.api_url}/menuItems`;
  constructor(private httpClient: HttpClient) { }

  getMenuItems(): Observable<MenuItems[]>{
    return this.httpClient.get<MenuItems[]>(this.apiUrl);
  }

  getMenuItemsById(id: string): Observable<MenuItems>{
    return this.httpClient.get<MenuItems>(`${this.apiUrl}/${id}`);
  }


  postMenuItems(menuItems: MenuItems): Observable<MenuItems>{
    menuItems.menuItemId = uuidv4();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<MenuItems>(`${this.apiUrl}/`, menuItems, { headers: headers });
  }

  putMenuItems(id: string, menuItems: MenuItems): Observable<MenuItems>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<MenuItems>(`${this.apiUrl}/${id}`, menuItems, { headers: headers });
  }

  deleteMenuItems(id: string): Observable<MenuItems>{
    return this.httpClient.delete<MenuItems>(`${this.apiUrl}/${id}`);
  }

}
