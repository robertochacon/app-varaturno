import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.component.html',
  styleUrls: ['./modal-password.component.css']
})
export class ModalPasswordComponent implements OnInit {

  password: string = '';
  loading: any = false;

  constructor(private _users: UsersService) { }

  ngOnInit(): void {
  }

  save(): void {

    this.loading = true;
    let user_id = localStorage.getItem('user_id');
    let datos = new FormData();
    datos.append("password",this.password);
    this._users.updateUsersPassword(user_id, datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Contraseña actualizada!',
        showConfirmButton: false,
        timer: 2000
      });
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

}
