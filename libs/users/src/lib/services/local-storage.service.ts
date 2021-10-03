import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  setIToken(data: any){
    localStorage.setItem('token',data);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  } 

  isValidToken() {
    const token =  this.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode.exp)
    }
    else{
      return false
    }
  }

  private _tokenExpired(expiration: any): boolean{
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
  getUserIdfromToken() {
    const token =  this.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode){
        return tokenDecode.userId;
      }
      else{
        return null
      }
    }
    else{
      return null
    }
  }
}
