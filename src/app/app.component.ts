import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Avisame';
  isHome: boolean = false;
  router =  inject(Router);

  constructor() {}

  ngOnInit() {
    //Para averiguar si estamos en la home, y segun esto activar unos estilos u otros
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const eventurl = (event as NavigationEnd);
        const currentUrl = (event as NavigationEnd).urlAfterRedirects;
        if (currentUrl === '/home' || currentUrl === '/') {
          this.isHome = true;
        } else {
          this.isHome = false;
        }
      });
  }
}
