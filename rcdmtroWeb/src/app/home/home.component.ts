import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BancosService } from '../servicios/bancos.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  public areas: any = [];
  public u: any;
  public isLog = false;
  public cargando = true;
  public premium = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public gServ:BancosService

  ) { }
  ngOnInit() {
    if (!localStorage.getItem('user')||!localStorage.getItem('usuarios')) {
      this.router.navigate(['/login']);
    } else {
      this.isLog = true;
      this.doGet();
      if (Number(localStorage.getItem('activo')) != 1) {
        this.premium = false;
      }
     }

  }
  doGet(){
    this.gServ.listar().subscribe(b => {
      console.log(b);

      this.areas = b;
        for (let i = 0; i < this.areas.length; i++) {
          this.areas[i].imgurl = 'assets/' + [i] + '.png';
        }
          this.cargando =false
          console.log(this.areas);

    });


  }


}
