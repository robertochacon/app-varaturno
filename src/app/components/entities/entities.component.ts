import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EntitiesService } from 'src/app/services/entities.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  name = '';
  description = '';
  address = '';
  phone = '';
  file: any = [];
  listEntities: any[] = [];

  constructor(private _entities: EntitiesService) { }

  ngOnInit(): void {
    this.getAllEntities();
  }

  getAllEntities(){
    this.loading = true;

    this._entities.getAllEntities().subscribe((response)=>{

      this.listEntities = response.data;

      setTimeout(function(){
        $('#listEntities').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listEntities').DataTable();
    },100);
  }

  getFile(event: any){
    this.file = event.target.files[0];
  }

  reset(){
    this.name = '';
    this.description = '';
    this.address = '';
    this.phone = '';
    this.file = [];
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("name",this.name);
    datos.append("description",this.description);
    datos.append("address",this.address);
    datos.append("phone",this.phone);
    datos.append("file",this.file);

    this._entities.setEntities(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
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
      title: 'Deseas eliminar esta entidad?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

        this._entities.deleteEntities(id).subscribe((response)=>{
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
