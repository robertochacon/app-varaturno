import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { TurnsService } from 'src/app/services/turns.service';
import { PatientsService } from 'src/app/services/patients.service';
import Echo from 'laravel-echo';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  loading = false;
  loadData = false;
  listTurns: any[] = [];
  listPatients: any[] = [];
  env:any = 'prod';

  constructor(private _services: ServicesService, private _turns: TurnsService, private _patient: PatientsService) { }

  ngOnInit(): void {
    this.getAllTurns();
    this.getAllPatients();
    this.websockets();
  }

  getAllTurns(){
    this.loading = true;

    this._turns.getAllTurns().subscribe((response)=>{

      this.listTurns = response.data;

      setTimeout(function(){
        console.log(response.data);
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  getAllPatients(){
    this.loading = true;

    this._patient.getAllPatients().subscribe((response)=>{

      this.listPatients = response.data.filter((item: { status: string; }) => item.status == 'call');
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
      const audio = new Audio('../../../assets/song/turno.mp3');
      
      if(typeof resp.msg === 'object' || resp.msg === 'update_turn' || resp.msg === 'delete_turn'){
        audio.play();
        this.getAllTurns();
      }else if (resp.msg === 'register_patient' || resp.msg === 'update_patient' || resp.msg === 'delete_patient') {
        audio.play();
        this.getAllPatients();
      }
    });

  }

  // voice(msg:any){

  //   let synth = window.speechSynthesis
  //   let text = "Turno "+msg.turno;
  //   let utterThis = new SpeechSynthesisUtterance(text)
  //   utterThis.lang = 'es-ES';
  //   synth.speak(utterThis)

  //   setTimeout(()=>{
  //     let utterThis = new SpeechSynthesisUtterance('Favor pasar al puesto'+msg.puesto);
  //     utterThis.lang = 'es-ES';
  //     synth.speak(utterThis);
  //   },1000);

  // }

  returnColor(status:string){
    if(status=='call'){
      return 'success';
    }else if(status=='wait'){
      return 'dark';
    }else{
      return 'info';
    }
  }

}
