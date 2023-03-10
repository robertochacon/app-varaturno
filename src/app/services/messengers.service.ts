import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class MessengersService {

  url = 'https://rcs-api-services-iffsq.ondigitalocean.app/api/deliverys';
  // url = 'http://127.0.0.1:8000/api/deliverys';

  constructor(private http: HttpClient) { }

  getAllMessengers(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  getAllMessengersByEntity(entity: any): Observable<any>{
    const url = this.url+'/entity/'+entity;
    return this.http.get(url);
  }

  getMessengers(identification: string): Observable<any>{
    const url = this.url+'/'+identification;
    return this.http.get(url);
  }

  setMessengers(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  deleteMessengers(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }

}
