import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.scss']
})
export class SintomasComponent {

  formValues: FormGroup;
  usersService =  inject(UsersService);
  notificacionesService = inject(NotificationsService);
  rolesService = inject(RolesService);
  router = inject(Router);

  constructor() {
    this.formValues = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmit() {
    
    const responseLogin = await this.usersService.login(this.formValues.value);

    //Mensaje de error si no va bien
    if (responseLogin.fatal) {
      return this.notificacionesService.showError(responseLogin.fatal);
    } 

    //Mensaje de error si no va bien
    if (!responseLogin.token) {
      return this.notificacionesService.showError("No se ha recuperado el token");
    } 

    //Obtenemos rol
    const tokenDecode = 
      jwtDecode<{ user_role: string, 
        user_id: string, 
        iat: number, 
        exp: number 
      }>(responseLogin.token!);
    
    //Guardamos variables de entorno
    localStorage.setItem('token_requests_browser', responseLogin.token);
    localStorage.setItem('role_requests_browser', tokenDecode.user_role);
    localStorage.setItem('user_id', tokenDecode.user_id);

    //Obtenemos profile
    const responseProfile = await this.usersService.getProfile();
      
    //Mensaje de error si no va bien
    if (responseProfile.fatal) {
      return this.notificacionesService.showError(responseProfile.fatal);
      localStorage.removeItem('token_requests_browser');
      localStorage.removeItem('role_requests_browser');
      localStorage.removeItem('user_id');
    } 

    //Actualizamos el obserbale de logged y role
    this.usersService.changeLogin(true);
    this.usersService.changeRole(tokenDecode.user_role);
    if (responseProfile.img) {
      this.usersService.changeImg(responseProfile.img);
    }

    //Notificamps que ha ido bien y redirigimos a avisos
    this.router.navigate(['/avisos']);
  }

  // Control de errores en formulario
  controlError(nombreCampo: string, tipoError: string): boolean {
    if (this.formValues.get(nombreCampo)?.hasError(tipoError) && 
        this.formValues.get(nombreCampo)?.touched) 
    {
      return true
    }
    return false
  }

}