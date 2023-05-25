import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  url: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('rooms');
  }

  getAllRooms(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  getAllRoomsByEntity(entidad: any): Observable<any>{
    const url = this.url+'/entity/'+entidad;
    return this.http.get(url);
  }

  setRooms(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  deleteRooms(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }

}
