import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-turns',
  templateUrl: './turns.component.html',
  styleUrls: ['./turns.component.css']
})
export class TurnsComponent implements OnInit {

  loading = false;
  loadData = false;
  result = '';
  name = '';
  description = '';
  listServices: any[] = [];

  constructor(private _entities: ServicesService) { }

  ngOnInit(): void {
    this.getAllEntities();
  }

  getAllEntities(){
    this.loading = true;

    this._entities.getAllServices().subscribe((response)=>{

      this.listServices = response.data;

      setTimeout(function(){
        console.log(response.data);
        
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

}
