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



