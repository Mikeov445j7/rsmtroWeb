import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rcdmtroWeb';
   public message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  public name: string | undefined;
  public inicio = true;
  public isLog = false;
  public activo: any;
  constructor(
    private platform: Platform,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    //this.initializeApp();

  }
  ngOnInit() {
  this.activo = Number(localStorage.getItem('activo'));
    console.log(this.activo);
      if(!localStorage.getItem('user')) {
       this.router.navigate(['/login']);
      }else {
       this.isLog = true;
     }
   }


  /*initializeApp() {
    this.platform.ready().then(() => {
      console.log('READY!')
      GoogleAuth.initialize(
        {
          clientId: '150725132712-broet6lb1rpu9r98j82701v4gk72ihe8.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
          grantOfflineAccess: true,
      }
      )
    })
  }*/


  ini(){
    this.inicio=false;
  }

}
