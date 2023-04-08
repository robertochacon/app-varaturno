import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  url = '';
  enviroment = 'prod';

  constructor() {
    if(this.enviroment == 'prod'){
      this.url = 'http://80.240.126.243';
    }else if(this.enviroment == 'dev'){
      this.url = 'http://127.0.0.1:8000';
    }
  }

  getUrl(params: any): string{
    return this.url+'/api/'+params;
  }

  getUrlForDocument(params: any): string{
    return this.url+'/storage/'+params;
  }
  
}
