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
  action:any = 'notification';
  notification:any = '';
  env:any = 'prod';

  constructor(private _services: ServicesService, private _turns: TurnsService, private _patient: PatientsService) { }

  ngOnInit(): void {
    this.getAllTurns();
    this.getAllPatients();
    this.websockets();
    this.notification = localStorage.getItem('notification');
    if(this.notification == 'sound' || this.notification == 'voice'){
      this.action = 'turns';
    }
  }

  getAllTurns(){
    this.loading = true;

    this._turns.getAllTurns().subscribe((response)=>{

      this.listTurns = response.data;
      this.listTurns = this.listTurns.filter((item: { status: string; }) => item.status == 'call');

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

  voiceTurn(msg:any){

    let synth = window.speechSynthesis
    let text = "Turno "+msg;
    let utterThis = new SpeechSynthesisUtterance(text)
    utterThis.lang = 'es-ES';
    synth.speak(utterThis)

    setTimeout(()=>{
      let utterThis = new SpeechSynthesisUtterance('Favor pasar a facturar');
      utterThis.lang = 'es-ES';
      synth.speak(utterThis);
    },1000);

  }

  voicePatient(msg:any){

    let synth = window.speechSynthesis
    let text = msg;
    let utterThis = new SpeechSynthesisUtterance(text)
    utterThis.lang = 'es-ES';
    synth.speak(utterThis)

    setTimeout(()=>{
      let utterThis = new SpeechSynthesisUtterance('Favor pasar a toma de muestra');
      utterThis.lang = 'es-ES';
      synth.speak(utterThis);
    },1000);

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
      this.getAllTurns();
      this.getAllPatients();
      console.log(resp.msg);
      
    if(this.notification == 'voice'){
      if(resp.msg.action === 'call_turn'){
        this.voiceTurn('0'+resp.msg.turn);
      }else if(resp.msg.action === 'call_patient'){
        this.voicePatient(resp.msg.patient);
      }
    }
    
    if(this.notification == 'sound'){
      const audio = new Audio('../../../assets/song/turno.mp3');
      if(resp.msg.action === 'call_turn'){
        audio.play();
      }else if(resp.msg.action === 'call_patient'){
        audio.play();
      }
    }
    
    });

  }

  setNotification(value:any){
    localStorage.setItem('notification',value);
    this.notification = localStorage.getItem('notification');
    this.action = 'turns';
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
