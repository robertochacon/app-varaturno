import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  loading=true

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loading = false;
    },2000)
  }

}
