import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = false;
  name: any = '';
  users = 0;
  documents = 0;
  shipments = 0;
  deliverys = 0;

  @Input() page: string = 'dashboard';
  constructor(private _home: HomeService) { 
    this.name = localStorage.getItem('name');
  }

  ngOnInit(): void {
    this.getAllInfo();
  }

  getAllInfo(){
    this.loading = true;

    let role = localStorage.getItem('role');
    let method;
    let entity = localStorage.getItem('entity_id');

    if(role==="super_admin"){
      method = this._home.getAllInfo();
    }else{
      method = this._home.getAllInfoByEntity(entity);
    }

    method.subscribe((response)=>{

      this.users = response.data.users;
      this.documents = response.data.documents;
      this.shipments = response.data.shipments;
      this.deliverys = response.data.deliverys;
      this.loading = false;
      
    }, error=>{
        this.loading = false;
    })

  }

}
