import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { TurnsService } from 'src/app/services/turns.service';
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

  constructor(private _services: ServicesService, private _turns: TurnsService) { }

  ngOnInit(): void {
    this.getAllTurns();
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

  websockets(){
    const echo = new Echo({
      broadcaster: 'pusher',
      cluster: 'mt1',
      key: 'RCA090698',
      // wsHost: window.location.hostname,
      wsHost: 'api.varaturno.com',
      // wsHost: '27.0.174.165',
      forceTLS: false,
      // wsPort: 6001,
      enabledTransports: ['ws']
    });

    echo.channel('channel-turns').listen('UpdateTurns', (resp:any) => {
      console.log(resp);
      this.getAllTurns();
      if(typeof resp.msg === 'object'){
        console.log('yes is object')
        this.voice(resp.msg)
      }
    });

  }

  voice(msg:any){

    let synth = window.speechSynthesis
    let text = "Turno "+msg.turno;
    let utterThis = new SpeechSynthesisUtterance(text)
    utterThis.lang = 'es-ES';
    synth.speak(utterThis)

    setTimeout(()=>{
      let utterThis = new SpeechSynthesisUtterance('Favor pasar al puesto'+msg.puesto);
      utterThis.lang = 'es-ES';
      synth.speak(utterThis);
    },1000);

  }

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
