import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  url: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('services');
  }

  getAllServices(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  getAllServicesByEntity(entidad: any): Observable<any>{
    const url = this.url+'/entity/'+entidad;
    return this.http.get(url);
  }

  getServices(identification: string): Observable<any>{
    const url = this.url+'/'+identification;
    return this.http.get(url);
  }

  setServices(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  deleteServices(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }

}
