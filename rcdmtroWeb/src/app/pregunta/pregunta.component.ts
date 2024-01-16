
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { BancosService } from '../servicios/bancos.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.scss'],
})
export class PreguntaComponent  implements OnInit {

public grupo: any;
  public banco: any;
  public listP: any;
  public inicio: any;
  public fin:any;
  public pregunta:any;
  public idP:any;
  public limites:any;
  public respuestas:any;
  public contestado=false;
  public Rcorrecta:any;
  public mensaje:any;
  public score = 0;
  public isToastOpen = false;
  public toasMsg:any;
  public tClase:any;
  public tIcono: any;
  public contestadas = 0;
  public irPremiun = false;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private _location: Location,
    private toastController: ToastController,
    public bServ:BancosService
  ) { }

ngOnInit() {
      if(this.route.snapshot.params['g'] && this.route.snapshot.params['b'] ){
        this.grupo = this.route.snapshot.params['g'];
        this.getBanco();
      }
}

  getBanco = async () => {
    const data = { id_banco: this.route.snapshot.params['b']}
    this.bServ.gentB(data).subscribe(b => {
      this.banco = b;
      this.banco = this.banco[0];
        console.log(this.banco);
        this.getListaP();
    });
  }

  getListaP(){
    const data = { banco_preguntas: this.route.snapshot.params['b'] };
    this.bServ.getLimit(data).subscribe(lp => {
      this.limites = lp;
      console.log(lp);
      this.inicio = Number(this.limites[0].id);
      this.fin = Number(this.limites[1].id);
      this.getPregunta();
    });

}

getPregunta(){
  let correcta=0;
  this.contestado = false;
  this.idP = this.randomIntFromInterval(this.inicio, this.fin);
  const data = { id_pregunta: this.idP };
  this.bServ.pregunta(data).subscribe(p => {

    this.pregunta = p;
    console.log(this.pregunta);
     correcta = Number(this.pregunta[0].respuesta);
  this.respuestas = [
          {id:1, texto:this.pregunta[0].r1, opcion:'A'},
          {id:2, texto:this.pregunta[0].r2, opcion:'B'},
          {id:3, texto:this.pregunta[0].r3, opcion:'C'},
          {id:4, texto:this.pregunta[0].r4, opcion:'D'},
          {id:5, texto:this.pregunta[0].r5, opcion:'E'}
  ]

  for(let i=0; i<this.respuestas.length; i++){
    if(this.respuestas[i].id === correcta){
      this.respuestas[i].correcta = true;
      this.Rcorrecta = this.respuestas[i];
    }
    else{
      this.respuestas[i].correcta = false;
    }

  }

  this.pregunta.respuestas = this.respuestas;
  });

  //console.log(this.pregunta);

}

randomIntFromInterval(min:any, max:any) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
ir(r:any){
  console.log(r);
  this.contestado = true;
  if(r.correcta){
    console.log('correcto', this.Rcorrecta);
    this.mensaje = 'CORRECTO!!';
    this.toasMsg = 'CORRECTO!! ' + this.Rcorrecta.opcion + ': ' + this.Rcorrecta.texto;
    this.tClase = 'tCorrecto'
    this.tIcono ='thumbs-up-outline'
    this.score++;
    this.setOpen(true);
  }
  if(!r.correcta){
    this.respuestas[r.id-1].fallo = true;
    console.log('falla', this.Rcorrecta);
    this.mensaje = 'INCORRECTO!! la respuesta es: ' + this.Rcorrecta;
    this.toasMsg = 'INCORRECTO!! la respuesta es: ' + this.Rcorrecta.opcion + ', ' + this.Rcorrecta.texto;
    this.tClase = 'tIncorrecto'
    this.tIcono = "thumbs-down-outline"
    this.setOpen(true);
  }
}

setOpen(isOpen: boolean) {
  this.isToastOpen = isOpen;
}
continuar() {
  if (Number(localStorage.getItem('activo')) != 1 ) {
    if(this.contestadas > 7){
      this.irPremiun = true;
    } else {
    this.contestadas++

  }

  }
    this.getPregunta();
    this.setOpen(false);

}
}
