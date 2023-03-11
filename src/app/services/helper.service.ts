import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  url = '';
  enviroment = 'dev';

  constructor() {
    if(this.enviroment == 'prod'){
      this.url = '';
    }else if(this.enviroment == 'dev'){
      this.url = 'http://127.0.0.1:8001';
    }
  }

  getUrl(params: any): string{
    return this.url+'/api/'+params;
  }

  getUrlForDocument(params: any): string{
    return this.url+'/storage/'+params;
  }
  
}
