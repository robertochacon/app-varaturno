import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = 'https://rcs-api-services-iffsq.ondigitalocean.app/api/home';
  // url = 'http://127.0.0.1:8000/api/home';

  constructor(private http: HttpClient) { }

  getAllInfo(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  getAllInfoByEntity(entidad: any): Observable<any>{
    const url = this.url+'/entity/'+entidad;
    return this.http.get(url);
  }

}
