import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BancosService } from '../servicios/bancos.service';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.scss'],
})
export class BancosComponent  implements OnInit {

   public bancos:any;
  public grupo: any;
  public u: any;
  public cargando = true;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public gServ:BancosService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params['g']) {
      this.grupo = this.route.snapshot.params['g'];
      this.doGet();
    }

  }
  doGet() {
    const data = { id_grupo: this.grupo }
    this.gServ.bancos(data).subscribe(b => {
      this.bancos = b;
      this.cargando = false;
    });

 }

}
