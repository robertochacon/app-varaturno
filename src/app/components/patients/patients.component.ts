import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ServicesService } from 'src/app/services/services.service';
import { PatientsService } from 'src/app/services/patients.service';
import Swal from 'sweetalert2'
import Echo from 'laravel-echo';
declare const $: any;


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  step = 1;
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  name = '';
  identification = '';
  role:any = '';
  phone = '';
  address = '';
  age = '';
  service = 'null';
  entity_id:any = '';
  patientjson:any = [];
  listPatients: any[] = [];
  listPatientsCalls: any[] = [];
  listPatientsInProcess: any[] = [];
  listPatientsDone: any[] = [];
  datos_services: any[] = [];
  listServices: any[] = [];
  firstPatient: any;
  firstPatientCall: any;
  env: any = 'prod';

  constructor(private _patient: PatientsService, private _services: ServicesService) { }

  ngOnInit(): void {
    this.getAllPatients();
    this.getAllServices();
    this.websockets();
    this.entity_id = localStorage.getItem('entity_id');
    this.role = localStorage.getItem('role');
  }

  getAllPatients(){
    this.loading = true;

    this._patient.getAllPatients().subscribe((response)=>{

      this.listPatients = response.data;

      //lista filtrando por status
      this.listPatientsCalls = this.listPatients.filter((item: { status: string; }) => item.status == 'call');
      this.listPatientsInProcess = this.listPatients.filter((item: { status: string; }) => item.status == 'process');
      this.listPatientsDone = this.listPatients.filter((item: { status: string; }) => item.status == 'done');

      //obteniendo primero de la lista en proceso
      this.firstPatientCall = this.listPatientsCalls[0];
      this.firstPatient = this.listPatientsInProcess[0];

      setTimeout(function(){
        $('#listPatientsInProcess').DataTable();
        $('#listPatientsCalls').DataTable();
        $('#listPatientsDone').DataTable();
      },200);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

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
      if (resp.msg === 'register_patient') {
        this.getAllPatients();
      }
    });

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listPatientsInProcess').DataTable();
      $('#listPatientsCalls').DataTable();
    },100);
  }

  getAllServices(){
    this._services.getAllServices().subscribe((response)=>{
      this.listServices = response.data;
      console.log(this.listServices);
    }, error=>{
      // this.listMessengers = [];
    })
  }

  reset(){
    this.name = '';
    this.identification = '';
    this.phone = '';
    this.age = '';
    this.address = '';
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("entity_id",'1');
    datos.append("name",this.name);
    datos.append("identification",this.identification);
    datos.append("phone",this.phone);
    datos.append("age",this.age);
    datos.append("address",this.address);
    datos.append("service",this.service);
    // datos.append("file",this.file);

    this._patient.setPatients(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.action = 'list';
      this.reset();
      this.getAllPatients();
    },error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Problemas tecnicos!',
        text: 'No se pudo completar el registro, favor intente nuevamente.',
        showConfirmButton: false,
        timer: 2000
      });
      this.loading = false;
    })

  }
  
  delete(id: any): void {
    Swal.fire({
      title: 'Deseas eliminar este paciente?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

      this._patient.deletePatients(id).subscribe((response)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado correctamente!',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllPatients();
      },error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Problemas tecnicos!',
          text: 'No se pudo completar el registro, favor intente nuevamente.',
          showConfirmButton: false,
          timer: 2000
        });
      })
    
      }
    })

  }

  setStatusTurn(status:string): void {

    let datos = new FormData();
    datos.append("status",status);
    this._patient.updatePatient(this.firstPatient.id, datos).subscribe((response)=>{
      console.log(this.firstPatient);
      
      this.getAllPatients();
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

  callPatient(status:string): void {

    let datos = new FormData();
    datos.append("status",status);
    this._patient.updatePatient(this.firstPatientCall.id, datos).subscribe((response)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Siguiente paciente llamado',
        showConfirmButton: false,
        timer: 2000
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

  setStatusTurnId(id:number, status:string): void {

    let datos = new FormData();
    datos.append("status",status);
    this._patient.updatePatient(id, datos).subscribe((response)=>{      
      this.getAllPatients();
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

  PrintTurn(patient: any){
    var mywindow: any;
  
    mywindow = window.open('', 'PRINT', 'height=10,width=10');
    let template = '';

    if(patient){
      template = `
      <html><head><title>LCR</title>
      </head><body>
      <br>
      <center>
      <p style="margin-top:-2px;"><strong>Identificación: </strong><br>${patient.identification}</p>
      <p style="margin-top:-18px;"><strong>Nombre: </strong><br>${patient.name}</p>
      <p style="margin-top:-18px;"><strong>Servicio: </strong><br>${patient.service}</p>
      </center>
      </body></html>
      `;
    }

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

    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Favor espere un momento',
      text: 'Procesando...',
      showConfirmButton: false,
      timer: 2000
    });
    setTimeout(() => {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Listo!',
        text: 'Ya puedes tomar el ticket',
        showConfirmButton: false,
        timer: 5000
      });
      
    }, 2000);

    return true;
  }

  searchPatient(){
    if(this.identification.length === 11){
      this._patient.getPatient(this.identification).subscribe((response)=>{
        let resp = response;
        this.name = resp.nombre+' '+resp.apellidos;
        this.age = resp.edad;
      });
    }
  }
  
  add_remove_item(value: string){
    this.datos_services.push(value)
    this.service = this.datos_services.toString();
    console.log(this.datos_services);
  }

  clear_services_selected(){
    this.service = '';
    this.datos_services = [];
  }

}
