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
        icon: 'success',
        title: 'Su turno es '+response.data.code+'-'+response.data.id,
        text: 'Favor tomar su ticket',
        showConfirmButton: false,
        timer: 5000
      });
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
  console.log('good');
  
    this.mywindow = window.open('', 'PRINT', 'height=200,width=100');

    this.mywindow.document.write('<html><head><title>Varaturno</title>');
    this.mywindow.document.write('</head><body>');
    this.mywindow.document.write('<h1>TURNO: ' + turn + '</h1>');
    this.mywindow.document.write('<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCRmCS1UF8zZm7to0ULVATi9Ahht1iSPSG8AXxxLd52w&s"><br>');
    this.mywindow.document.write('</body></html>');

    this.mywindow.document.close(); // necessary for IE >= 10
    this.mywindow.focus(); // necessary for IE >= 10*/

    this.mywindow.print();
    this.mywindow.close();

    return true;
}

}
