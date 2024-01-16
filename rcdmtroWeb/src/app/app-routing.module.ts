import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bancos/:g', component: BancosComponent },
  { path: 'ex-pasado/:e/:d', component: ExPasadoComponent },
  { path: 'examen', component: ExamenComponent },
  { path: 'examenes-pasados', component: ExamenesPasadosComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'boton-premium', component: ObtenerPremiumComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'pregunta/:g/:b', component: PreguntaComponent },
  { path: 'obtener-premium', component: PremiunFormComponent  },
  { path: 'sharing', component: SharingComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),  RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
