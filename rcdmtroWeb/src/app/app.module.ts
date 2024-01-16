import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/es-BO';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BancosComponent } from './bancos/bancos.component';
import { ExPasadoComponent } from './ex-pasado/ex-pasado.component';
import { ExamenComponent } from './examen/examen.component';
import { ExamenesPasadosComponent } from './examenes-pasados/examenes-pasados.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ObtenerPremiumComponent } from './obtener-premium/obtener-premium.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { PremiunFormComponent } from './premiun-form/premiun-form.component';
import { SharingComponent } from './sharing/sharing.component';
import { UsersComponent } from './users/users.component';

registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent,
    BancosComponent,
    ExPasadoComponent,
    ExamenComponent,
    ExamenesPasadosComponent,
    HomeComponent,
    LoginComponent,
    ObtenerPremiumComponent,
    PerfilComponent,
    PreguntaComponent,
    PremiunFormComponent,
    SharingComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot({})
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-BO' },
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
