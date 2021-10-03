import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private localStorageService: LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    const token  = this.localStorageService.getToken();
    if(token){
        const decodeToken: any = JSON.parse(atob(token.split('.')[1]));
        if(decodeToken.isAdmin && !this._tokenExpired(decodeToken.exp)){
          return true
        }
        else{
          this.router.navigate(['/login']);
          return false
        }
    }
    else{
      this.router.navigate(['/login']);
      return false
    }
  }

  private _tokenExpired(expiration: any){
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
