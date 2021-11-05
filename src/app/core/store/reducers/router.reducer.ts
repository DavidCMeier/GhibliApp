import { Params, RouterStateSnapshot } from "@angular/router";
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
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams }} = routerState;
    const { params } = route;

    return { url, params, queryParams };
}
}
