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
          title: 'Su turno es '+response.data.code+'-'+response.data.id,
          text: 'Favor tomar su ticket',
          showConfirmButton: false,
          timer: 5000
        });
        
      }, 2000);
      this.PrintTurn(response.data.code+'-'+response.data.id);
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

  PrintTurn(turn: any)
{
    var mywindow: any;
  
    mywindow = window.open('', 'PRINT', 'height=10,width=10');

    let template = `
    <html><head><title>Varaturno</title>
    </head><body>
    <center><h1>TURNO<br>${turn}</h1></center>
    <center><img src="../../../assets/img/qr.png" class="shadow mb-4" width="110px" style="margin-top:-20px;border-radius: 5px 5px;"></center>
    </body></html>
    `;

    mywindow.document.write(template);

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    setTimeout(() => {
      mywindow.blur(); // necessary for IE >= 10*/
      mywindow.print();
      setTimeout(() => {
        mywindow.close();
      }, 300);
    }, 300);

    return true;
}

}
