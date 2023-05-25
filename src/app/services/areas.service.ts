import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  url: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('areas');
  }

  getAllAreas(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  getAllAreasByEntity(entidad: any): Observable<any>{
    const url = this.url+'/entity/'+entidad;
    return this.http.get(url);
  }

  setAreas(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  deleteAreas(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }

}
