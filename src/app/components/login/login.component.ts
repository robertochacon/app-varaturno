import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError = false;
  identification = "";
  password = "";
  loading = false;
  
  constructor(private _authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void{
    this.loading = true;
    this.loginError = false;

    this._authentication.login(this.identification,this.password).subscribe((response)=>{

        localStorage.setItem("user_id", response.user.id);
        localStorage.setItem("name", response.user.name);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("entity", JSON.stringify(response.user));
        localStorage.setItem("role", response.user.role);
        localStorage.setItem("entity_id", response.user.entity_id);
        localStorage.setItem("token", response.token);
      
        setTimeout(() => {
          this.loading = false;
          if(response.user.role == 'delivery'){
            this.router.navigate(["/messengers-shipments"]);
          }else{
            this.router.navigate(["/dashboard"]);
          }
        }, 2000);

    }, error => {
      this.loading = false;
      this.loginError = true;
    })

  }

}
