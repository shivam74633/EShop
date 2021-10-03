import { createAction, props } from "@ngrx/store";


export const buildUserSession = createAction('[Users] Build User Session')


export const buildUsersSuccess = createAction(
  "[Users] Build User Session Success",
  props<{ user: any }>()
);

export const buildUsersFailed = createAction("[Users] Build User Session Failed");
