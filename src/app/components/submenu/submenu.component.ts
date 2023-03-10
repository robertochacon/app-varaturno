import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent implements OnInit {

  @Input() page: string;
  role: any;

  constructor(private router: Router) {
    this.page='';
  }

  ngOnInit(): void {
    const session = localStorage.getItem('token');
    this.role = localStorage.getItem('role');
    if(!session || session === undefined){
      this.router.navigate(['/login']);
    }
  }

  salir(){

      Swal.fire({
      title: 'Seguro que deseas salir?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, salir',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

  }

}
