import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  usuariosService = inject(UsersService); 
  router = inject(Router);

  loggedIn: boolean = false;
  roleValue: String = "";
  roleAdminKey: String = RolesService.roleAdmin;
  roleRegularKey: String = RolesService.roleRegular;

  searchQuery: string = '';
  iconColorBefore: string = '';
  iconColorAfter: string = '';
  showSearchIconBefore: boolean = true;
  showSearchIconAfter: boolean = false;
  isHome: boolean = false; // Inicialmente vacío
  showDropdown: boolean = false;


  constructor() {}

  ngOnInit() {
    //Para averiguar si estamos en la home, y segun esto activar unos estilos u otros
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = (event as NavigationEnd).urlAfterRedirects;
        if (currentUrl === '/home' || currentUrl === '/') {
          this.isHome = true;
          this.iconColorBefore = '#fff';
          this.iconColorAfter = 'black';
        } else {
          this.isHome = false;
          this.iconColorBefore = 'black';
          this.iconColorAfter = '#fff';
        }
      });
    
    
    //Para Saber si estamos logeados
    this.usuariosService.logged.subscribe(value => {
      this.loggedIn = value;
    });

    //Para saber el role
    this.usuariosService.role.subscribe(value => {
      this.roleValue = value;
    });
  }
  //Se ejecutara cuando se escriba algo en el buscador
  updateIconColor(): void {
    if (this.searchQuery.trim() !== '') {
        if (this.isHome) {
          this.iconColorBefore = 'black';
          this.iconColorAfter = '#fff';
        } else {
          this.iconColorBefore = '#fff';
          this.iconColorAfter = 'black';
        }
        this.showSearchIconBefore = false;
        this.showSearchIconAfter = true;
    } else {
        if (this.isHome) {
          this.iconColorBefore = '#fff';
          this.iconColorAfter = 'black';
        } else {
          this.iconColorBefore = '#black';
          this.iconColorAfter = '#fff';
        }
        this.showSearchIconBefore = true;
        this.showSearchIconAfter = false;
    }
  }
  
  //Para ocuktar el menu
  toggleOther(): void {
    this.showDropdown = false;
  }

  //Toggle menú dropdown
  toggleDropdown(event: Event) {
    this.showDropdown = !this.showDropdown;
  }

  //Cuando se haga logout se saldra y se borra el localstorage
  onClickLogout() {
    localStorage.removeItem('token_requests_browser');
    localStorage.removeItem('role_requests_browser');
    localStorage.removeItem('user_id');
    this.usuariosService.changeLogin(false);
    this.usuariosService.changeRole("");
    this.usuariosService.changeImg("");

    this.router.navigate(['/login']);
  }

 
}
