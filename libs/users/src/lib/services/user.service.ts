import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { UsersFacade } from '../state/users.facade';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApiUrl = environment.apiURl+ 'user';

  constructor(private http: HttpClient,private userFacade: UsersFacade) { }

  getUsers() : Observable<any>{
    return this.http.get(this.userApiUrl);
  }

  getUser(id: string) : Observable<any>{
    return this.http.get(`${this.userApiUrl}/${id}`);
  }

  createUser(user: any) : Observable<any>{
    return this.http.post(this.userApiUrl,user)
  }

  deleteUser(userId: string): Observable<any>{
    return this.http.delete(`${this.userApiUrl}/${userId}`)
  }

  updateUser(userId: string,user: any) : Observable<any>{
    return this.http.put(`${this.userApiUrl}/${userId}`,user);
  }

  login(user: any): Observable<any>{
    return this.http.post(`${this.userApiUrl}/login`,user);
  }

  initAppSession(){
    this.userFacade.buildUserSession();
  }

  observeCurrentUser(){
    return this.userFacade.currentUser$
  }

  isCurrentUserAuth(){
    return this.userFacade.isAuthenticated$;
  }
}
