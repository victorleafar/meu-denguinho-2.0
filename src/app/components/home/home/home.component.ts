import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AvisosService } from 'src/app/services/avisos.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { TablaRefreshService } from 'src/app/services/tabla-refresh.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  usuariosService = inject(UsersService); 
  router = inject(Router);

  avisos: any[];
  avisosService = inject(AvisosService);
  notificationService = inject(NotificationsService); 
  url_param : string = "avisos";
  deleteAllowed: boolean = false;
  
  constructor(private tablaRefreshService: TablaRefreshService) {
    this.avisos = [];
    //Pintamos la tabla con los datos
    if (this.usuariosService.isLogged()) {
      this.tablaRefreshService.refreshTablaSubject.subscribe(value => {
        this.printTable()
      });
    }
  }
  
  async printTable() :Promise<void> {
    try{
      let response = await this.avisosService.getAll();
      if (response.fatal) {
        return this.notificationService.showError(response.fatal);
      }
      this.avisos= response;
    } catch(error){
      this.notificationService.showError("Algo ha ido mal al cargar la tabla, mira el error en la consola");
      console.log(error)
    }
  }
  
}
