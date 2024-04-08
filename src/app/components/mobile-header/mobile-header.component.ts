import { Component, HostBinding, HostListener, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss'
})
export class MobileHeaderComponent {

  isMenuOpen = false;
  @Input() isHome : boolean = false;
  @Input() loggedIn : boolean = false;
  @Input() roleValue: String = "";
  roleAdminKey: String = RolesService.roleAdmin;
  roleRegularKey: String = RolesService.roleRegular;
  showDropdown: boolean = false;

  usuariosService = inject(UsersService);
  router = inject(Router);

  //Para ocular los menus
  toggleOther(): void {
    this.showDropdown = false;
    this.isMenuOpen = false;
  }

  //Menu principal
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.showDropdown = false;
  }

  //Toggle menú dropdown
  toggleDropdown(event: Event) {
    this.showDropdown = !this.showDropdown;
    this.isMenuOpen = false;
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
