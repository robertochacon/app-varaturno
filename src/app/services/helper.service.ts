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
      // this.url = 'https://api.varaturno.online';
      this.url = 'http://27.0.174.165';
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
