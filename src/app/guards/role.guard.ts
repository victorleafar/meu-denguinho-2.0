import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Verificamos que el rol que le llega como parametro en el ActivatedRouteSnapshot,
//sea uno de los roles que le pasamos en el routing, si es asi dejamos
//pasar - APSP
export class RoleGuard  {
  constructor(private router : Router) {}
  
  canActivate(route: ActivatedRouteSnapshot) : boolean {
    var getRole : string |any = localStorage.getItem('role_requests_browser');
    
    if (route.data['role'] && 
        route.data['role'].length > 0 &&
        route.data['role'].find(
          (paramRole: string) => getRole == paramRole)) 
    {
      return true;
    }
    return false;
  }
  
}
