import { createAction, props } from "@ngrx/store";
import { NavigationExtras } from "@angular/router";

export const go = createAction('[Router] Go', props<{ commands: any[]; extras?: NavigationExtras }>());
export const back = createAction('[Router] Back');
export const forward = createAction('[Router] Forward');
