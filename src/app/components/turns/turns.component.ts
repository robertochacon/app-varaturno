import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ServicesService } from 'src/app/services/services.service';
import { TurnsService } from 'src/app/services/turns.service';
import Swal from 'sweetalert2'
import Echo from 'laravel-echo';
declare const $: any;

@Component({
  selector: 'app-turns',
  templateUrl: './turns.component.html',
  styleUrls: ['./turns.component.css']
})
export class TurnsComponent implements OnInit {

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
  firstTurnInProcess: any;
  firstTurnCall: any;
  listWindows: any[] = [];
  listServices: any[] = [];
  listTurns: any[] = [];
  listTurnsCalls: any[] = [];
  listTurnsInProcess: any[] = [];
  listTurnsDone: any[] = [];
  env: any = 'prod';

  constructor(private _services: ServicesService, private _turns: TurnsService, private _router: Router) { }

  ngOnInit(): void {
    this.getAllTurns();
    this.websockets();
    this.user_id = localStorage.getItem('user_id');
    this.entity_id = localStorage.getItem('entity_id');
    this.windows = localStorage.getItem('aw');
    for(let i=1; i<= parseInt(this.windows);i++){
      this.listWindows.push(i);
    }
  }

  getAllTurns(){
    this.loading = true;
    this._turns.getAllTurns().subscribe((response)=>{

      this.listTurns = response.data;
      this.listTurnsCalls = this.listTurns.filter((item: { status: string; }) => item.status == 'call');
      this.listTurnsInProcess = this.listTurns.filter((item: { status: string; }) => item.status == 'wait');
      this.firstTurnInProcess = this.listTurnsInProcess[0];
      this.firstTurnCall = this.listTurnsCalls[0];

      setTimeout(function(){
        $('#listTurnsInProcess').DataTable();
        $('#listTurnsCalls').DataTable();
      },200);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })
  }

  getJustTurns(){
    this._turns.getAllTurns().subscribe((response)=>{
      this.listTurns = response.data;
      this.listTurnsCalls = this.listTurns.filter((item: { status: string; }) => item.status == 'call');
      this.listTurnsInProcess = this.listTurns.filter((item: { status: string; }) => item.status == 'wait');
      this.firstTurnInProcess = this.listTurnsInProcess[0];
    }, error=>{})
  }

  websockets(){

    let config;
    if(this.env==='dev'){
      config = {
        broadcaster: 'pusher',
        cluster: 'mt1',
        key: 'RCA090698',
        wsHost: window.location.hostname,
        forceTLS: false,
        wsPort: 6001,
        enabledTransports: ['ws']
      }
    }else if(this.env==='prod'){
      config = {
        broadcaster: 'pusher',
        cluster: 'mt1',
        key: 'RCA090698',
        wsHost: '80.240.126.243',
        forceTLS: false,
        enabledTransports: ['ws']
      }
    }

    const echo = new Echo(config);
    echo.channel('channel-turns').listen('UpdateTurns', (resp:any) => {
      if (resp.msg === 'register_turn' || resp.msg === 'update_turn') {
        this.getJustTurns();
      }
    });

  }

  deleteTurn(id: any): void {
      this._turns.deleteTurns(id).subscribe((response)=>{
        this.deleteRow(id);
        this.getAllTurns();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Turno eliminado.',
          showConfirmButton: false,
          timer: 2000
        });
      },error => {})
  }

  attendTurn(id:any){
    this._turns.deleteTurns(id).subscribe((response)=>{
      this.deleteRow(id);
      this.getAllTurns();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Turno atendido.',
        showConfirmButton: false,
        timer: 2000
      });
      setTimeout(()=>{
        this._router.navigate(['/patients']);
      },2000);
    },error => {})
  }

  setNextTurn(status:string){
    this.deleteRow(this.firstTurnInProcess.id);
    let datos = new FormData();
    datos.append("status",status);
    this._turns.updateTurns(this.firstTurnInProcess.id, datos).subscribe((response)=>{
      this.getAllTurns();
    },error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Problemas tecnicos!',
        text: 'No se pudo completar la ejecucion, favor intente nuevamente.',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  callNextTurn(status:string){
    let datos = new FormData();
    datos.append("status",status);
    this._turns.updateTurns(this.firstTurnCall.id, datos).subscribe((response)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Siguiente turno llamado',
        showConfirmButton: false,
        timer: 1000
      });
    },error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Problemas tecnicos!',
        text: 'No se pudo completar la ejecucion, favor intente nuevamente.',
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  deleteRow(id:number){
    $("#item_" + id).remove();
  }

}
