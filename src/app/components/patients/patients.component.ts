import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ServicesService } from 'src/app/services/services.service';
import { PatientsService } from 'src/app/services/patients.service';
import Swal from 'sweetalert2'
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
  role = 'admin';
  phone = '';
  address = '';
  age = '';
  service = 'null';
  entity_id:any = '';
  listPatients: any[] = [];
  listPatientsCalls: any[] = [];
  listPatientsInProcess: any[] = [];
  listServices: any[] = [];
  firstPatient: any;

  constructor(private _patient: PatientsService, private _services: ServicesService) { }

  ngOnInit(): void {
    this.getAllPatients();
    this.getAllServices();
    this.entity_id = localStorage.getItem('entity_id');
  }

  getAllPatients(){
    this.loading = true;

    this._patient.getAllPatients().subscribe((response)=>{

      this.listPatients = response.data;

      //lista filtrando por status
      this.listPatientsCalls = this.listPatients.filter((item: { status: string; }) => item.status == 'call');
      this.listPatientsInProcess = this.listPatients.filter((item: { status: string; }) => item.status == 'process');

      //obteniendo primero de la lista en proceso
      this.firstPatient = this.listPatientsInProcess[0];

      setTimeout(function(){
        $('#listPatientsInProcess').DataTable();
        $('#listPatientsCalls').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

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
    datos.append("entity_id",this.entity_id);
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
      title: 'Deseas eliminar este usuario?',
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

}
