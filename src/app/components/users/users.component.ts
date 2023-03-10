import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EntitiesService } from 'src/app/services/entities.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  step = 1;
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  name = '';
  identification = '';
  role = 'admin';
  entity:any = 'seleccionar';
  listUsers: any[] = [];
  listEntities: any[] = [];

  constructor(private _users: UsersService, private _entities: EntitiesService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllEntities();
  }

  getAllUsers(){
    this.loading = true;

    this._users.getAllUsers().subscribe((response)=>{

      this.listUsers = response.data;

      setTimeout(function(){
        $('#listUsers').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listUsers').DataTable();
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
    this.role = '';
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("entity_id",this.entity);
    datos.append("name",this.name);
    datos.append("identification",this.identification);
    datos.append("role",this.role);
    // datos.append("file",this.file);

    this._users.setUsers(datos).subscribe((response)=>{
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

      this._users.deleteUsers(id).subscribe((response)=>{
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
