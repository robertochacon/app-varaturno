import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class TurnsService {
  url: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('turns');
  }

  getAllTurns(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  getAllTurnsByEntity(entidad: any): Observable<any>{
    const url = this.url+'/entity/'+entidad;
    return this.http.get(url);
  }

  getTurns(identification: string): Observable<any>{
    const url = this.url+'/'+identification;
    return this.http.get(url);
  }

  setTurns(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  updateTurns(id: number, json: any): Observable<any>{
    const url = this.url+'/update/'+id;
    return this.http.post(url, json);
  }

  deleteTurns(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }

}
