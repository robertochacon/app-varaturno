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
  action = 'start';
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
  mywindow: any;

  constructor(private _services: ServicesService, private _turns: TurnsService) { }

  ngOnInit(): void {
    // this.getAllServices();
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
    datos.append("user_id",'1');
    datos.append("entity_id",'1');
    // datos.append("service",this.serviceName);
    datos.append("code","");
    this._turns.setTurns(datos).subscribe((response)=>{
    
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Procesando...',
        text: 'Favor espera un momento.',
        showConfirmButton: false,
        timer: 2000
      });
      setTimeout(() => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Su numero de turno es: TN-'+response.data.id,
          text: 'Favor tomar su ticket',
          showConfirmButton: false,
          timer: 5000
        });
        
        setTimeout(() => {
          this.action = 'start';
        }, 1000);
        
      }, 2000);

      this.PrintTurn('TN-'+response.data.id);
      this.getAllTurns(response.data.id);

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

  getAllTurns(id:any){
    this._turns.getAllTurns().subscribe((response)=>{
      this.listTurns = response.data;

      let turns = this.listTurns.filter((item: { status: string; }) => item.status == 'call');
  
      if(turns.length<=4){
        setTimeout(() => {
          let datos = new FormData();
          datos.append("status",'call');
          this._turns.updateTurns(id, datos).subscribe((response)=>{},error => {})
        }, 2000);
      }

    }, error=>{})
  }

  PrintTurn(turn: any){
    var mywindow: any;
  
    mywindow = window.open('', 'PRINT', 'height=10,width=10');

    let template = `
    <html><head><title>LCR</title>
    </head><body>
    <center><h1>TURNO<br>${turn}</h1></center>
    <center><img src="../../../assets/img/qr.png" class="shadow mb-4" width="110px" style="margin-top:-20px;border-radius: 5px 5px;"></center>
    </body></html>
    `;

    mywindow.document.write(template);

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.blur(); // necessary for IE >= 10*/
    // mywindow.focus(); // necessary for IE >= 10*/

    setTimeout(() => {
      mywindow.print();
      setTimeout(() => {
        mywindow.close();
      }, 300);
    }, 300);

    return true;
  }

}
