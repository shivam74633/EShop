import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";

import * as UsersActions from "./users.actions";
import {catchError, concatMap,map} from "rxjs/operators";
import { LocalStorageService } from "../services/local-storage.service";
import { of } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable()
export class UsersEffects {
  buildUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap( () => {
      if(this.localStorageService.isValidToken()){
        const userId = this.localStorageService.getUserIdfromToken();
        if(userId){
          return this.userService.getUser(userId).pipe(
            map((user) => {
              return UsersActions.buildUsersSuccess({user: user.data});
            },catchError(() => of(UsersActions.buildUsersFailed())))
          )
        }else{
          return of(UsersActions.buildUsersFailed());
        }
      }
      else{
        return of(UsersActions.buildUsersFailed());
      }
    })
  ))

  constructor(private actions$: Actions,private localStorageService: LocalStorageService,private userService: UserService) {}

  
}
