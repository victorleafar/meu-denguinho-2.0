import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/quiz/quiz.component';
import { SintomasComponent } from './components/sintomas/sintomas/sintomas.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home',component: HomeComponent},
  { path: 'quiz', 
    component: RegisterComponent,
    canActivate: [LoginGuard],
    data: {pantallaLogin : true}
  },
  { path: 'sintomas', 
    component: SintomasComponent,
    canActivate: [LoginGuard],
    data: {pantallaLogin : true}
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
