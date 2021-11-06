# Guía de NGRX

Empezamos instalando NGRX:

```
npm install @ngrx/store --save
```
Existe un ng add que te hace la instsalación completa y te modifica la app para que funcione con NGRX. Pero vamos a ir paso a paso, porque además el proyecto no sigue una arquitectura normal.

Vamos a instalar una librería que nos ayudará a desarrollar y no saltarnos una de las normas de Redux. La inmutabilidad del store.
```
npm i --save-dev ngrx-store-freeze
```
En root.module.ts creamos un MetaReducer para congelar el store solo si estamos en desarrollo:
```
export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze]: [];
```

También instalaremos la configuración para la devTools: 
```
npm install @ngrx/store-devtools --save
```
Continuamos con los efectos: 
```
npm install @ngrx/effects --save
```
El estado del Router: 
```
npm install @ngrx/router-store --save
```
seguidamente añadimos el store al modulo root: 
```ts
@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    RootRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Prosegur App DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule { }
```
- StoreModule.forRoot({}, { metaReducers }), aquí añadimos los reducers al store para que se inicialicen.
- EffectsModule.forRoot([]) nos sirve para inicializar los efectos que en este caso están vacios.
- StoreDevtoolsModule.instrument, aquí añadimos la configuración para la devTools.
  - El name es el nombre de la aplicación que mostrará la devtools.
  - El maxAge es la cantidad de estados que se guardarán en el historial.
  - La propiedad sirve para permitimos modificar el estado desde la devtools.

Ahora que tenemos el devtool preparado lo instalamos: 
[https://github.com/zalmoxisus/redux-devtools-extension/](https://github.com/zalmoxisus/redux-devtools-extension/)

Ahora se puede comprobar como la store está inicializada pero aun sin estados.


## Store
Empezamos creando la estructura de carpetas y ficheros en core: 
- core
  - store
    - actions
      - index.ts
      - preferences.actions.ts
      - router.actions.ts
    - effects
      - index.ts
      - preferences.effects.ts
      - router.effects.ts
    - reducers
      - index.ts
      - preferences.reducer.ts
      - router.reducer.ts
    - selectors
      - index.ts
      - preferences.selectors.ts
      - router.selectors.ts
    - index.ts

En el index.ts principal importamos el resto de carpetas: 
```ts
export * from './actions';
export * from './effects';
export * from './reducers';
export * from './selectors';
```

Vamos a empezar por crear los reducers, para ello primero pensamos en la estructura del estado que queremos:
en el reducers/index.ts lo creamos: 

```ts
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

export interface CoreState {
  preferences: fromPreferences.State,
  router: fromRouter.State
}

export const reducers: ActionReducerMap<CoreState> = {
  preferences: fromPreferences.reducer,
  router: fromRouter.reducer
}

export const getCoreState = createFeatureSelector<CoreState>('core');
```
** No os preocupéis por las importaciones, aun no tenemos creados los ficheros.

Muy bien pasamos al reducer de las preferencias:
```ts
import { createReducer, on } from "@ngrx/store";


export interface State {
  language: string;
}

export const initialState: State = {
  language: 'en'
};

export const reducer = createReducer<State>(
  initialState,
  on(preferencesActions.setLanguage, (state, action): State => ({...state, language: action.language}))
)
```
- Creamos una interfaz para definir nuestro estado.
- Creamos el estado inicial del estado.
- Creamos el reducer:
  - Le pasamos el estado inicial.
  - La función on permite al reducer ponerse a la escucha de la acción. Cuando esta sucede se ejecuta el callback.
  - Usamos el spread (...) para almacenar un nuevo estado y no modificar el estado actual.
  - Es normal que no tengamos aun la importación de la acción.

Una vez creado ya podemos importarlo en el reducers/index.ts:
```
import * as fromPreferences from './preferences.reducer';
```

Vamos a crear las acciones para las preferencias antes de ponernos con el router: 
- Abrimos el fichero actions/preferences.actions.ts y añadimos esto:
```ts
export const setLanguage = createAction('[Preferences] Set Language', props<{ language: string }>());
```

De esta manera creamos una acción para cambiar el idioma.
- El createAction tiene dos propiedades: 
  - El primer parámetro es el nombre de la acción. Este string tiene que ser único, por eso usamos esta estrategia:
    - [Modulo al que pertenece] acción a realizar
  - El segundo parámetro es opcional y hace referencia a los datos que se le pasarán a la acción:
    - En este caso lo que necesitamos pasarle es el idioma que es un string.

Añadimos las acciones al actions/index.ts: 
```ts
export * from './preferences.actions';
```
Con esto ya podemos volver al reducer y añadir la importación de las acciones: 
```ts
import * as preferencesActions from '../actions';
```

Ya tenemos lo básico de Redux funcionando. Antes de continuar con los efectos y los selectores vamos a probarlo pero para ello tendremos que añadir al modulo el store.

en los imports de core.module.ts:
```ts
import * as fromState from "./store";
...

StoreModule.forFeature('core', fromState.reducers)
```
- La primera propiedad indica el nombre que tendrá el store.
- La segunda se tiene que importar todos los reducers de dentro del reducers/index.ts
  - Para facilitar esto se usan los index en cada carpeta. Por eso solo tenemos que importar la carpeta store

Aprovechamos y comentamos del store/index.ts la exportación de los effects y los selectores.

Muy bien si vamos a la devtools vemos el estado inicializado con la preferencia de idioma en inglés. 
Para cambiar esto debemos de ejecutar una acción que la cambie y para eso tenemos el selector de idiomas.

vamos al shell.component.ts y lo añadimos: 
```ts
...
import * as fromStore from '../../store';
...
  constructor(
    ...
    private store$: Store<fromStore.CoreState>
  ) { }
...
  changeLanguage(language: string) {
    this.store$.dispatch(fromStore.setLanguage({ language }));
  }

}
```
Ahora prueba a cambiar el idioma en la barra del menú y comprueba como se modifica el estado en la devtools.

Pero claro, aunque se guarde el idioma no se está cambiando. Para esto entran los efectos.
Lo primero es crear el efecto en effects/preference.effects.ts:
```ts
import { CoreState } from '../reducers';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import * as preferencesActions from '../actions';

@Injectable()
export class PreferencesEffects {
  constructor(
    private actions$: Actions,
    private translate: TranslateService,
    private store: Store<CoreState>
  ) {}

  setLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(preferencesActions.setLanguage),
      tap((action) => {
        this.translate.use(action.language);
      })
    )
  );
}
```
- Se crea un servicio y en el constructor inyectamos Actions, el Store y para este caso el TranslateService.
- Creamos una variable de clase que se inicializa con un createEffect().
- En el callback llamamos al servicio de Actions y le hacemos un pipe, ya que este Servicio devuelve un observable.
- Usamos el ofType(Action) para indicarle al efecto que esté a la escucha de la acción. Sería el equivalente al on del reduce.
Ahora si probáis veréis que aun no funciona y eso es porque aun no hemos inicializado los efectos.

Primero en effects/index.ts: 
```ts
import { PreferencesEffects } from './preferences.effects';

export const effects = [PreferencesEffects]

export * from './preferences.effects';

```
- Primero creamos y exportamos una constante con un array de efectos. Estos se usarán en el core.module.effects
- Luego exportamos la clase del efecto.

Ahora en el store/index.ts des comentamos: 
```ts
export * from './effects';
```
Vamos al core.module.ts y añadimos en los imports: 
```ts
EffectsModule.forFeature(fromState.effects)
```
Ahora al probarlo veréis que la aplicación no funciona. La aplicación se ha quedado en un bucle infinito. Trabajando con Ngrx es bastante común que pase estas cosas para cerrar la pestaña sin cerrar chrome: 
- Click botón derecho sobre un hueco en la parte de arriba de las pestañas -> Administrador de tareas -> ordenáis por uso de CPU -> cerráis la pestaña de la app.

Esto ocurre porque en el efecto el createEffect hace automáticamente un dispatch de la acción, al no haber usado otra que no fuese el serLanguage, esta vuelve a ejecutarse y vuelve a entrar en el effect.
Para evitar esto hay que añadir lo siguiente: 
```ts 
  setLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(preferencesActions.setLanguage),
      tap((action) => {
        this.translate.use(action.language);
      })
    ),
    { dispatch: false } // <--- 
  );
```

Ahora funciona perfectamente.

Vamos a crear ahora un selector para saber que idioma estamos usando: 

Abrimos selectors/preference.selectors.ts:
```ts
import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getPreferences = createSelector(fromFeature.getCoreState, (state) => state.preferences);
export const getCurrentLanguage = createSelector(getPreferences, (state) => state.language);
```

El createSelector recibe dos parametros: 
1. Un selector.
2. un callback que accede a la información del selector y le indicas lo que quieres que devuelva.

- En el primer selector que hemos creado si os fijáis importamos el getCoreState que hemos creado en el reducers/index.ts.
- Le indicamos que devuelva el elemento preference del estado. 
- Con este selector creado, creamos el segundo usando este como primer parametro y ahora sí devolvemos el idioma.

Como detalle en los selectores podéis mezclar diferentes selectores para crear vuestra propia estructura de datos que queráis devolver, pero recordar que esto no modifica el estado, solo lo lee.

Añadimos en el selectors/index.ts: 
```ts
export * from './preferences.selectors';
```
Descomentamos del store/index.ts la importación de los selectores.

Con esto ya podemos usarlo en nuestros contenedores. 

Vamos al shell.component.ts:
y cambiamos la variable currentLang, ahora será un observable: 
```ts
...
export class ShellComponent implements OnInit {
  ...
  currentLang$ = this.store$.select(fromStore.getCurrentLanguage)
  ...
}
```
Borra las referencias que tuvieses en el fichero a currentLang porque ahora le añadimos el $ para indicar que es un observable.

En el html lo modificamos para usar el observable nuevo:
```html
<ng-container *ngIf="currentLang$ | async as currentLang">
  <app-header [languages]="languages" (changeLanguage)="changeLanguage($event)" [currentLang]="currentLang"></app-header>
</ng-container>

<section class="shell">
  <router-outlet></router-outlet>
</section>
```

Con esto todo volverá a funcionar igual que antes, pero ahora estaremos cargando el idioma actual en el componente del menú. 

Ya estaría el funcionamiento básico de ngrx implementado.

### El pipe de Async
El uso de este pipe es especialmente interesante al usar ngrx ya que te evitas estar desuscribiendote de los observables. Cuando se destruye el componente se desuscribe automáticamente.
Además viene bien para usar la detección de cambios OnPush.

Con onPush vamos a mejorar mucho la performance de la página ya que evitamos muchisimos de los repintados que ejecuta angular.

Ahora bien con OnPush tienes que tener en cuenta que los cambios no los va a detectar siempre, por ejemplo:
- Si usas un objeto y modificas una propiedad de este.
- Si usas push sobre un array.

Esto ocurre porque con OnPush se detectan los cambios solo cuando cambia la referencia de la variable. 
Al modificar el valor de un elemento del objeto la referencia sigue siendo la misma, igual que al usar un push del array.

Lo que tenemos que hacer es añadir esto en todos los componentes: 
```ts
@Component({
  ...,
  changeDetection: ChangeDetectionStrategy.OnPush, // <------
})
```
Por supuesto si ya sabéis que vais a usar el OnPush siempre lo recomendable es lanzar este comando:
en el angular.json
```json
{
  "projects": {
    "ghibliApp": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "changeDetection": "OnPush" // <-----
        }
        ...
      }
    }
  }
}
```
Ahora cuando creéis un componente nuevo con el cli automáticamente se añadirá la propiedad OnPush en el componente.

### Router

Para hacer lo mismo con la navegación usaremos lo que ngrx nos ofrece:
vamos a core.module.ts y añadimos el import:
```ts
StoreRouterConnectingModule.forRoot()
```
Empezamos con el reducers/router.reducer.ts:
```ts
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
```
- Como vemos se parece mucho a lo que hicimos con las preferencias pero aquí el reducer nos viene ya dado por la librería.
- Para no sobrecargar el estado con datos que no vamos a usar realmente lo que hacemos es personalizar el serialize para guardar exclusivamente la url, las params y las queryParams. 
- Si se quisiera añadir algo más se podría agregar aquí y almacenarlo.

En el reducers/index.ts añadimos (O descomentamos si lo tenemos comentado): 
```ts
...
import * as fromRouter from './router.reducer';

 export interface CoreState {
  ...,
  router: fromRouter.State; // <-----
}
export const reducers: ActionReducerMap<CoreState> = {
   ...,
  router: fromRouter.reducer, // <----
}
```
Ahora podemos ver como en la devtool nos aparece el estado del router.

En este momento vamos a añadir el CustomSerializer al modulo:

core.module.ts y añadimos: 
```ts
providers: [
  { provide: RouterStateSerializer, useClass: CustomSerializer }
]
```

Creamos las acciones para poder navegar usando el store dentro de actions/router.actions.ts: 
```ts
import { createAction, props } from "@ngrx/store";
import { NavigationExtras } from "@angular/router";

export const go = createAction('[Router] Go', props<{ commands: any[]; extras?: NavigationExtras }>());
export const back = createAction('[Router] Back');
export const forward = createAction('[Router] Forward');
```
La que más usaremos será el go, pero dejamos las otras dos creadas por si se quiere implementar una navegación más completa.
Añadimos el export al actions/index.ts

Vamos a crear el effect del router: 
```ts
@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private store: Store<CoreState>
  ) {}

  go$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.go),
        tap(({ commands, extras }) => {
          this.router.navigate(commands, { ...extras });
        })
      ),
    { dispatch: false }
  );

  back$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.back),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );

  forward$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.forward),
      tap(() => this.location.forward())
    ),
    {dispatch: false}
  );
}
```
- Cuando se ejecute la acción go se llamará al router.navigate con la información que se quiera.
- igualmente tenemos creado los efectos para el back y el forward.
- Importarte no olvidar el dispatch: false para evitar caer en un bucle infinito.
- ngrx nos ofrece ya muchas acciones por si queremos controlar nuevos efectos, como añadir un loading cuando te mueves :
  - La idea es que primero escuchas routerRequestAction y lanzas el loading.
  - Luego escuchas routerCancelAction, routerErrorAction, routerNavigatedAction y cuando cualquiera de estas ocurra pues cierras el loader.

Antes de continuar no nos olvidemos de añadir el RouterEffects en el effects/index.ts y exportar el fichero ahí.

Ahora cambianos los router.navigate de la film-page.component.ts y search-page.component.ts:
```ts 
...
import * as fromCoreStore from '../../../../core/store';

constructor(
  ...,
  private store$: Store,
)

openFilm(id: string){
  this.store$.dispatch(fromCoreStore.go({commands: ['/films', id]}));
}
```

Para terminar con el router vamos a crear los selectores para ayudarte a tener a mano siempre la información del router y actuar ante cambios.

En la app no tenemos que usarlos ahora mismo, pero un ejemplo de uso sería: 
```ts 
this.store$
      .select(fromCore.getRouteParams)
      .pipe(take(1), withLatestFrom(this.store$.select(fromCore.getQueryParams)))
      .subscribe(([params, queryParams]) => {
        //El uso que se quiera dar a las params y las queryParams
      })
```

Con esto nuestro core estaría terminado.


## Crear Store para Feature/Films

Bueno aquí ya entramos a aplicar todo lo aprendido hasta ahora.

La idea se podría ver como crear un fichero de actions, effects, reducer y selectors por cada "página" que tengamos. En este caso tenemos la página del listado y la del detalle.
Si tuviesemos un formulario, este debería de ir en otro reducer también (si queremos mantener el estado)

Esta sería la estructura final que usaríamos para films:
- Store
  - Actions
    - index.ts
    - film-detail.actions.ts
    - films-page.actions.ts
  - Effects
    - index.ts
    - film-detail.effects.ts
    - films-page.effects.ts
  - Reducers
    - index.ts
    - film-detail.reducer.ts
    - films-page.reducer.ts
  - Selectors
    - index.ts
    - film-detail.selectors.ts
    - films-page.selectors.ts
- index.ts

Empezamos con los reducers, primero el index.ts:
```ts
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromFilms from './films-page.reducer'
import * as fromDetails from './films-details.reducer'

export interface FilmsState {
  films: fromFilms.State,
  details: fromDetails.State,
}

export const reducers: ActionReducerMap<FilmsState> ={
  films: fromFilms.reducer,
  details: fromDetails.reducer
}

export const getFilmsFeatureState = createFeatureSelector<FilmsState>('films')
  
```
Ahora con films-page.reducer.ts:
```ts
import { Film } from "../../models/film.model";
import { createReducer, on } from "@ngrx/store";
import * as filmsPageActions from '../actions'
export interface State {
  films: Film[],
  loading: boolean
}

export const initialState: State = {
  films: [],
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(filmsPageActions.loadFilms, (state) => ({
    ...state,
    loading: true,
  })),
  on(filmsPageActions.loadFilmsSuccess, (state, action) => ({
    ...state,
    loading: false,
    films: action.films
  })),
  on(filmsPageActions.loadFilmsError, (state) => ({
    ...state,
    loading: false,
  })),
)
```
- Vemos como hemos añadido una propiedad al estado para poner una pantalla de loading.
- Estamos escuchando 3 acciones:
  - La primera es el loadFilms donde indicamos que vamos a realizar la llamada al servicio y por eso cambiamos el estado del loading a true.
  - La segunda será ejecutada durante el efecto y cargará los datos en el estado además de cambiar el loading a false.
  - La tercera la usaremos por si la llamada fallase quitar el loading. Se ejecutará desde el efecto también.

Este patron se usa siempre para realizar la carga de datos desde un api.
  
Si necesitases algún parametro para realizar la llamada en el servicio deberías de almacenarla aquí, esto lo veremos en el siguiente reducer.

Creamos el reducer para el film-detail.reducer.ts:
```ts
import { Film } from "../../models/film.model";
import { createReducer, on } from "@ngrx/store";
import * as filmsPageActions from '../actions'
export interface State {
  film: Film,
  loading: boolean,
  uuid: string
}

export const initialState: State = {
  film: {
    id: '',
    title: '',
    original_title: '',
    original_title_romanised: '',
    image: '',
    movie_banner: '',
    description: '',
    director: '',
    producer: '',
    release_date: '',
    running_time: '',
    rt_score: '',
    people: [],
    species: [],
    locations: [],
    vehicles: [],
    url: ''
  },
  loading: false,
  uuid: ''
};

export const reducer = createReducer(
  initialState,
  on(filmsPageActions.loadFilm, (state, action) => ({
    ...state,
    loading: true,
    uuid: action.uuid
  })),
  on(filmsPageActions.loadFilmsSuccess, (state, action) => ({
    ...state,
    loading: false,
    film: action.film
  })),
  on(filmsPageActions.loadFilmsError, (state) => ({
    ...state,
    loading: false,
  })),
)

```
- Como vemos, cuando realizamos el loadFilm almacenamos el uuid que necesitaremos usar en el servicio.


creamos las acciones: 

film-detail.actions.ts
```ts
import { createAction, props } from "@ngrx/store";
import { Film } from "../../models/film.model";

export const loadFilm = createAction('[Films Detail] Load Film', props<{uuid: string}>())
export const loadFilmSuccess = createAction('[Films Detail] Load Film Success', props<{film: Film}>())
export const loadFilmError = createAction('[Films Detail] Load Film Success')
```
films-page.actions.ts
```ts
import { createAction, props } from "@ngrx/store";
import { Film } from "../../models/film.model";

export const loadFilms = createAction('[Films Page] Load Films')
export const loadFilmsSuccess = createAction('[Films Page] Load Films Success', props<{films: Film[]}>())
export const loadFilmsError = createAction('[Films Page] Load Films')
```
actions/index.ts
```ts
export * from './film-detail.actions';
export * from './films-page.actions';
```
Ahora que ya sabemos las acciones y lo que realizan cada una de ellas creamos los efectos: 

empezamos por films-page.effects.ts:
```ts
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FilmService } from "../../services/film.service";
import * as fromActions from '../actions';
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class FilmsPageEffects {
  constructor(private actions$: Actions, private filmService: FilmService) {}

  loadFilms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadFilms),
      switchMap(() =>
        this.filmService.getListFilms().pipe(
          map((films) =>
            fromActions.loadFilmsSuccess({films})
          ),
          catchError(() => of(fromActions.loadFilmsError()))
        )
      )
    )
  );
}
```
- Nos fijamos que aquí hacemos un switchMap para realizar la llamada al api, pero esta llamada del api tiene un map en el que devolvemos una acción de success a la que le pasamos el resultado.
- En el catchError, si la llamada falla devolvemos la acción de error.

Como no vamos a realizar nada más con el resto de acciones, no añadimos más efectos a este archivo.

vamos con el film-detail.effects.ts:
```ts
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FilmService } from "../../services/film.service";
import * as fromActions from '../actions';
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class FilmDetailEffects {
  constructor(private actions$: Actions, private filmService: FilmService) {}

  loadFilmDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadFilm),
      map(action => action.uuid),
      switchMap((uuid) =>
        this.filmService.getFilmById(uuid).pipe(
          map((film) =>
            fromActions.loadFilmSuccess({film})
          ),
          catchError(() => of(fromActions.loadFilmError()))
        )
      )
    )
  );
}
```
- Aquí podemos ver como el ofType nos devuelve las props de la acción. Estas las mapeamos para tenerlas más a mano, pero no es imprescindible.

Añadimos al effects/index.ts:
```ts
import { FilmsPageEffects } from "./films-page.effects";
import { FilmDetailEffects } from "./film-detail.effects";

export const effects = [FilmsPageEffects, FilmDetailEffects]

export * from './film-detail.effects'
export * from './films-page.effects'
```

Vamos a terminar con los selectores: 

films-page.selectors.ts
```ts
import { createSelector } from "@ngrx/store";
import { getFilmsFeatureState } from "../reducers";

export const getFilmsState = createSelector(getFilmsFeatureState, (state) => state.films)
export const getFilmsList = createSelector(getFilmsState, (state) => state.films)
export const getFilmsLoading = createSelector(getFilmsState, (state) => state.loading)
```
film-detail.selectors.ts
```ts
import { createSelector } from "@ngrx/store";
import { getFilmsFeatureState } from "../reducers";

export const getDetailsState = createSelector(getFilmsFeatureState, (state) => state.details);
export const getFilmDetail = createSelector(getDetailsState, (state) => state.film);
export const getFilmLoading = createSelector(getDetailsState, (state) => state.loading);
export const getFilmUuid = createSelector(getDetailsState, (state) => state.uuid);
```

selectors/index.ts
```ts
export * from './film-detail.selectors';
export * from './films-page.selectors';
```

Vale ya tenemos los selectores ahora solo nos queda inicializar el modulo y añadir los imports correspondientes: 

films.module.ts
```ts
import * as fromStore from './store';
...
    StoreModule.forFeature('films', fromStore.reducers),
    EffectsModule.forFeature(fromStore.effects)
```

Ahora que tenemos todo el Store preparado, vamos a implementarlo en los componentes:

films-page.component.ts
```ts
import * as fromStore from '../../store';
...
export class FilmsPageComponent implements OnInit {
  
  films$: Observable<Film[]> = this.store$.select(fromStore.getFilmsList); // <--- 1º
  
  constructor(private filmService: FilmService, 
              private store$: Store<fromStore.FilmsState> // <---- 2º
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(fromStore.loadFilms()); // <----- 3º
  }
}
```
1. Se usa el selector para tener un observable con todas las películas.
2. Cambiamos el store para indicarle con más detalle de donde estamos leyendo. Igualmente podemos seguir usando el core para navegar.
3. Por defecto el array de peliculas está vacio porque ese es su estado inicial, por eso ejecutamos la acción que realiza la carga de peliculas.

Vamos a la página de detalle: 

film-detail.component.ts
```ts
...
import * as fromStore from "../../store";
import * as fromCoreStore from "../../../../core/store";

export class FilmDetailComponent implements OnInit {

  film$: Observable<Film> = this.store$.select(fromStore.getFilmDetail); // <----- 1º

  constructor(private route: ActivatedRoute,
              private filmService: FilmService,
              private store$: Store<fromStore.FilmsState> , // <----- 2º
  ) {}

  ngOnInit(): void {
    this.store$
      .select(fromCoreStore.getRouteParams) // <----- 3º
      .pipe(take(1), withLatestFrom(this.store$.select(fromCoreStore.getQueryParams))) // <----- 4º
      .subscribe(([params, queryParams]) => {
        const uuid = params.id;
        console.log(queryParams) // <----- 5º
        this.store$.dispatch(fromStore.loadFilm({uuid})); // <----- 6º
      })
  }
}
```
1. Se usa el selector para tener un observable con la película.
2. Cambiamos el store para indicarle con más detalle de donde estamos leyendo.
3. Se usa el selector para tener el uuid de la película.
4. Aquí usamos el withLatestFrom para traernos el último valor de las queryParams. 
5. Aunque las query params ahora no lo usamos pero así podéis ver como se podrían combinar dos selectores o más.
6. Ejecutamos la acción para cargar la pelicula pasandole el uuid que usaremos en el effect.


Esto sería todo para implementar el store y traernos las películas. 

## RETO implementar el store en la feature de Search

estructura: 
- Store
  - Actions
    - index.ts
    - search-page.actions.ts
  - Effects
    - index.ts
    - search-page.effects.ts
  - Reducers
    - index.ts
    - search-page.reducer.ts
  - Selectors
    - index.ts
    - search-page.selectors.ts
- index.ts

reducers/index.ts
```ts
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromSearch from './search-page.reducer';

export interface SearchState {
  search: fromSearch.State,
}

export const reducers: ActionReducerMap<SearchState> = {
  search: fromSearch.reducer,
}

export const getSearchFeatureState = createFeatureSelector<SearchState>('search')
```
search-page.reducer.ts
```ts
import { Film } from "../../../films/models/film.model";
import { createReducer, on } from "@ngrx/store";
import * as filmsPageActions from '../actions'

export interface State {
  films: Film[],
  query: string,
  loading: boolean
}

export const initialState: State = {
  films: [],
  query: '',
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(filmsPageActions.loadSearchedFilm, (state, action) => ({
    ...state,
    query: action.query,
    loading: true,
  })),
  on(filmsPageActions.loadSearchedFilmSuccess, (state, action) => ({
    ...state,
    loading: false,
    films: action.films
  })),
  on(filmsPageActions.loadSearchedFilmError, (state) => ({
    ...state,
    loading: false,
  })),
)
```

search-page.actions.ts
```ts
import { createAction, props } from "@ngrx/store";
import { Film } from "../../../films/models/film.model";

export const loadSearchedFilm = createAction('[Search Page] Load Searched Films', props<{query: string}>())
export const loadSearchedFilmSuccess = createAction('[Search Page] Load Searched Films Success', props<{films: Film[]}>())
export const loadSearchedFilmError = createAction('[Search Page] Load Searched Films Error')
```

actions/index.ts
```ts
export * from './search-page.actions';
```

search-page.effects.ts
```ts
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from '../actions';
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { FilmService } from "../../../films/services/film.service";

@Injectable()
export class SearchPageEffects {
  constructor(private actions$: Actions, private filmService: FilmService) {}

  loadFilms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadSearchedFilm),
      map(action => action.query),
      switchMap((query) =>
        this.filmService.searchFilms(query).pipe(
          map((films) =>
            fromActions.loadSearchedFilmSuccess({films})
          ),
          catchError(() => of(fromActions.loadSearchedFilmError()))
        )
      )
    )
  );
}
```

effects/index.ts
```ts
import { SearchPageEffects } from "./search-page.effects";

export const effects = [SearchPageEffects]

export * from './search-page.effects'
```

search-page.selectors.ts
```ts
import { createSelector } from "@ngrx/store";
import { getSearchFeatureState } from "../reducers";

export const getFilmsState = createSelector(getSearchFeatureState, (state) => state.search)
export const getFilmsSearched = createSelector(getFilmsState, (state) => state.films)
export const getFilmsQuery = createSelector(getFilmsState, (state) => state.query)
export const getSearchLoading = createSelector(getFilmsState, (state) => state.loading)
```
selectors/index.ts
```ts
export * from './search-page.selectors';
```

store/index.ts
```ts
export * from './actions';
export * from './effects';
export * from './reducers';
export * from './selectors';
```

search.module.ts
```ts
import * as fromStore from "./store";

imports: [
  StoreModule.forFeature('search', fromStore.reducers),
  EffectsModule.forFeature(fromStore.effects)
]
```

search-page.component.ts
```ts
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilmService } from "../../../films/services/film.service";
import * as fromCoreStore from "../../../../core/store";
import * as fromStore from "../../store";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit {
  films$ = this.store$.select(fromStore.getFilmsSearched);

  constructor(private filmService: FilmService, private store$: Store<fromStore.SearchState>) { }

  ngOnInit(): void {
  }

  searchFilm(searchText: string) {
    this.store$.dispatch(fromStore.loadSearchedFilm({ query: searchText }));
  }

  openFilm(id: string){
    this.store$.dispatch(fromCoreStore.go({commands: ['/films', id]}));
  }
}
```

Con esto toda la aplicación estaría lista con su estado guardado.

##Bonus Añadir componente Loading

Vamos a crear un componente de loading para mostrar una animación mientras carga los datos.

```
ng g c shared/components/loading
```

```html
<div class="flex-center">
  <mat-spinner diameter="200"></mat-spinner>
</div>
```

```scss
.flex-center{
  display: flex;
  justify-content: center;
}
```

y lo añadiremos así en las páginas contenedores: 

```html
<app-loading *ngIf="loading$ |async"></app-loading>
```

cargamos el loading en el .ts de los contenedores: 
```ts
loading$: Observable<boolean> = this.store$.select(fromStore.getFilmsLoading);
```

Con esto tendremos los loadings añadidos.

## Arreglar Parpadeo

Si entráis a el detalle de una pelicula, salís y volvéis a entrar veréis que, incluso con el loading se ve la carga de dato anterior, parpadea y la nueva información aparece.
Esto ocurre porque el estado inicial del detalle es un objeto inicializado entonces el if siempre es true. 

Para evitar esto tenemos que declarar en el estado que el objeto puede ser null. Además crearemos una nueva acción para limpiar el estado al destruirse el componente.

actions/film-detail.actions.ts
```ts
export const unloadFilm = createAction('[Films Detail] Unload Film')
```
reducers/film-detail.reducer.ts
```ts
import { Film } from "../../models/film.model";
import { createReducer, on } from "@ngrx/store";
import * as filmsDetailActions from '../actions'

export interface State {
  film: Film | null, //<--- 1º
  loading: boolean,
  uuid: string | null // <--- 2º
}

export const initialState: State = {
  film: null, // <--- 3º
  loading: false,
  uuid: null // <--- 4º
};

export const reducer = createReducer(
  initialState,
  on(filmsDetailActions.loadFilm, (state, action) => ({
    ...state,
    loading: true,
    uuid: action.uuid
  })),
  on(filmsDetailActions.loadFilmSuccess, (state, action) => ({
    ...state,
    loading: false,
    film: action.film
  })),
  on(filmsDetailActions.loadFilmError, (state) => ({
    ...state,
    loading: false,
  })),
  on(filmsDetailActions.unloadFilm, (state) => ({ // <--- 5º
    ...state,
    film: null,
    uuid: null
  }))
)
```
1. Declaramos que el film puede ser null
2. Hacemos lo mismo con el uuid
3. Inicializamos el film a null
4. Inicializamos el uuid a null
5. UnloadFilm se dispara cuando se destruye el componente, por lo que limpiamos el estado.

en el componente de detalle: 
```ts
  ngOnDestroy(): void {
    this.store$.dispatch(fromStore.unloadFilm());
  }
```
