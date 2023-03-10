import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  url: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('entities');
  }

  getAllEntities(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  getEntities(identification: string): Observable<any>{
    const url = this.url+'/'+identification;
    return this.http.get(url);
  }

  setEntities(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  deleteEntities(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }


}
