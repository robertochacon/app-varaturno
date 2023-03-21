import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EntitiesService } from 'src/app/services/entities.service';
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
  listEntities: any[] = [];

  constructor(private _patient: PatientsService, private _entities: EntitiesService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllEntities();
    this.entity_id = localStorage.getItem('entity_id');
  }

  getAllUsers(){
    this.loading = true;

    this._patient.getAllUsers().subscribe((response)=>{

      this.listPatients = response.data;

      setTimeout(function(){
        $('#listPatients').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listPatients').DataTable();
    },100);
  }

  getAllEntities(){
    this._entities.getAllEntities().subscribe((response)=>{
      this.listEntities = response.data;
      console.log(this.listEntities);
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
    // datos.append("file",this.file);

    this._patient.setUsers(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllUsers();
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

      this._patient.deleteUsers(id).subscribe((response)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado correctamente!',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllUsers();
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


}
