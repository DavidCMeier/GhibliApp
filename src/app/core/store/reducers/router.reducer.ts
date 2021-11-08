import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from "@angular/router";
import * as fromRouter from '@ngrx/router-store';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export type State = fromRouter.RouterReducerState<RouterStateUrl>;

export const reducer = fromRouter.routerReducer;

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {

    let state: ActivatedRouteSnapshot = routerState.root;
    let { params } = state;
    while (state.firstChild) {
      state = state.firstChild;
      params = Object.assign({}, { ...params }, { ...state.params });
    }

    const { url, root: { queryParams }} = routerState;

    return { url, params, queryParams };
}
}
