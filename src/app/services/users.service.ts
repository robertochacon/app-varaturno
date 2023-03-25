import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('users');
  }

  getAllUsers(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  setUsers(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  updateUsersPassword(id: any, json: any): Observable<any>{
    const url = this.url+'/reset_password/'+id;
    return this.http.post(url, json);
  }

  deleteUsers(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }


}
