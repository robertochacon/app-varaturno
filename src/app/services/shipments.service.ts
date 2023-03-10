import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {

  url = 'https://rcs-api-services-iffsq.ondigitalocean.app/api/shipments';
  // url = 'http://127.0.0.1:8000/api/shipments';

  constructor(private http: HttpClient) { }

  getAllShipments(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  getAllShipmentsByEntity(entity: any): Observable<any>{
    const url = this.url+'/entity/'+entity;
    return this.http.get(url);
  }

  getShipments(identification: string): Observable<any>{
    const url = this.url+'/'+identification;
    return this.http.get(url);
  }

  setShipments(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  assignToShipments(id: number, messenger: any): Observable<any>{
    const url = this.url+'/assign_messenger/'+id+'/'+messenger;
    return this.http.get(url);
  }

  setStatusShipments(id: number, status: any): Observable<any>{
    const url = this.url+'/status/'+id+'/'+status;
    return this.http.get(url);
  }

  deleteShipments(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }

}
