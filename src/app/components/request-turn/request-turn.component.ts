import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { TurnsService } from 'src/app/services/turns.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-request-turn',
  templateUrl: './request-turn.component.html',
  styleUrls: ['./request-turn.component.css']
})
export class RequestTurnComponent implements OnInit {

  loading = false;
  loadData = false;
  result = '';
  selectTurn:any = '';
  turnName = '';
  serviceName = '';
  code = '';
  user_id:any = '';
  entity_id:any = '';
  windows:any = '';
  listWindows: any[] = [];
  listServices: any[] = [];
  listTurns: any[] = [];

  constructor(private _services: ServicesService, private _turns: TurnsService) { }

  ngOnInit(): void {
    this.getAllServices();
    this.user_id = localStorage.getItem('user_id');
    this.entity_id = localStorage.getItem('entity_id');
    this.windows = localStorage.getItem('aw');
  }

  getAllServices(){
    this.loading = true;

    this._services.getAllServices().subscribe((response)=>{

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

  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("user_id",this.user_id);
    datos.append("entity_id",this.entity_id);
    datos.append("service",this.serviceName);
    datos.append("code",this.code);
    this._turns.setTurns(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Completado',
        text: 'El turno '+response.data.code+response.data.id+' ha sido registrado.',
        showConfirmButton: false,
        timer: 4000
      });
      this.getAllTurns();
    },error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Problemas tecnicos!',
        text: 'No se pudo completar el registro, favor intente nuevamente.',
        showConfirmButton: false,
        timer: 3000
      });
      this.loading = false;
    })

  }

  getAllTurns(){
    this.loading = true;

    this._turns.getAllTurns().subscribe((response)=>{

      this.listTurns = response.data;

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
