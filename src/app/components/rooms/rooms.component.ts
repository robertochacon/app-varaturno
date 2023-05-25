
import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HelperService } from '../../services/helper.service';
import { EntitiesService } from 'src/app/services/entities.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  name = '';
  description = '';
  color = 'primary';
  code = '';
  user_id:any = '';
  entity_id:any = '';
  listRooms: any[] = [];

  constructor(private _rooms: RoomsService) { }

  ngOnInit(): void {
    this.getAllEntities();
    this.user_id = localStorage.getItem('user_id');
    this.entity_id = localStorage.getItem('entity_id');
  }

  getAllEntities(){
    this.loading = true;

    this._rooms.getAllRooms().subscribe((response)=>{

      this.listRooms = response.data;

      setTimeout(function(){
        $('#listRooms').DataTable();
      },200);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listRooms').DataTable();
    },100);
  }

  reset(){
    this.name = '';
    this.description = '';
    this.color = 'primary';
    this.code = '';
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("user_id",'1');
    datos.append("entity_id",'1');
    datos.append("name",this.name);
    datos.append("description",this.description);
    this._rooms.setRooms(datos).subscribe((response)=>{
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
      this.getAllEntities();
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
      title: 'Deseas eliminar esta servicio?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

        this._rooms.deleteRooms(id).subscribe((response)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminada correctamente!',
            showConfirmButton: false,
            timer: 2000
          });
          this.getAllEntities();
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
