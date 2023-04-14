import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  url: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('patients');
  }

  getAllPatients(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  setPatients(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  updatePatient(id: number, json: any): Observable<any>{
    const url = this.url+'/update/'+id;
    return this.http.post(url, json);
  }

  deletePatients(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }

  getPatient(identification: any,): Observable<any>{
    const url = 'https://api.cedulado.microslab.com.do/api/cedulado/'+identification;
    return this.http.get(url);
  }

}
