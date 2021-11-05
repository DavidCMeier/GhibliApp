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
```
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
