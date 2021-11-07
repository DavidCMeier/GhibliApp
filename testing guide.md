#Testing


## Instalación de Jest


Primero desinstalaremos Karma: 
```
npm remove karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter
```
Borramos también los ficheros ./karma.conf.js  y ./src/test.ts

Vamos a empezar a instalar los paquetes necesarios para usar jest: 
```
npm i -D jest @types/jest @angular-builders/jest
```

Con Jest vamos a ganar ciertas funciones de mockeado que nos permitirá agilizar muchísimo nuestro desarrollo de tests.

Además: 
- Es más rápido que Karma.
- Está muy bien documentado y tiene una gran comunidad detrás.
- Identifica mejor los tests erróneos para relanzar solo los que fallan.
- Puede usarse en cualquier framework.

Nos queda un par de cosas que modificar, primero el tsconfig.spec.json:
```json
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "esModuleInterop": true, // <--- 1º
    "outDir": "./out-tsc/spec",
    "types": [
      "jest" // <--- 2º
    ]
  },
  "files": [ // <--- 3º
    "src/polyfills.ts" 
  ],
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
```
1. Emite los helpers __importStar y __importDefault para la compatibilidad del ecosistema babel en tiempo de ejecución.
  - Por defecto (con esModuleInterop false o no establecido) TypeScript trata los módulos CommonJS/AMD/UMD de forma similar a los módulos ES6. Al hacer esto, hay dos partes en particular que resultaron ser suposiciones erróneas:
    - Una importación como `import * as moment de "moment"` actúa igual que `const moment = require("moment")`
    - Una importación por defecto como  `import moment from "moment` actúa igual que `const moment = require("moment").default`
    - Este error de concordancia causa estos dos problemas:
      - La especificación de los módulos ES6 establece que una importación de espacio de nombres (import * as x) sólo puede ser un objeto, haciendo que TypeScript lo trate igual que = require("x") entonces TypeScript permite que la importación sea tratada como una función y sea invocable. Eso no es válido según la especificación.
      - Aunque se ajustaba a la especificación de los módulos de ES6, la mayoría de las bibliotecas con módulos CommonJS/AMD/UMD no se ajustaban tan estrictamente como la implementación de TypeScript.
  - Activar esModuleInterop arreglará estos dos problemas en el código transpilado por TypeScript. El primero cambia el comportamiento en el compilador, el segundo se arregla con dos nuevas funciones de ayuda que proporcionan un shim para asegurar la compatibilidad en el JavaScript emitido.
2. Dejamos solo el tipado de jest
3. Eliminamos la referencia al fichero de test.

Vamos al package.json, en los scripts añadiremos:
```
"test:watch": "ng test -- --watchAll --detectOpenHandles",
"test:coverage": "ng test -- --coverage"
```
- Con --watch dejaremos en escucha los tests que van fallando y cada vez que guardemos se ejecutaran.
- Con --detectOpenHandles evitaremos un problema que puede ocurrirnos a la hora de usar --watch y que nos indica un problema de convertir una estructura ciclica del json.
- Con --coverage generaremos una cobertura de los tests.

En la configuración del angular.json modificamos los tests para que pillen el nuevo builder:
```json
{
  "test": {
    "builder": "@angular-builders/jest:run",
    "options": {
      "polyfills": ["src/polyfills.ts"],
      "tsConfig": "tsconfig.spec.json",
      "inlineStyleLanguage": ["scss"],
      "assets": [
        "src/favicon.ico",
        "src/assets"
      ],
      "styles": [
        "src/styles.scss"
      ],
      "scripts": []
    }
  }
}
```

Con esto ya debería de estar todo funcionando ejecutamos en una terminal `ng test` y probamos.

##Empezamos los primeros tests.
Lo primero es que todos los que tenemos creados pasen, para que así veamos más fácilmente los errores futuros: 

Con algunos tests vamos a encontrarnos con una dicotomía a la hora de resolverlos: 
Por ejemplo con card-detail.component.spec.ts:
- Después de añadir el TranslateModule.forRoot() en los imports el error será que no se encuentra title de undefined. 
- Esto ocurre porque nuestro componente no tiene inicializado los inputs, lo cual puede ser algo que requiramos.
- Para solucionarlo, si no queremos inicializarlo deberíamos de añadir un *ngIf en el primer elemento del html que engloba todo para indicarle que se renderice cuando exista el objeto.
- La estrategia a utilizar será la que más os convenga. No hay una mejor que otra, dependerá de la situación.
- Este problema os ayudará a hacer vuestra app más resistente ante fallos.

Algunos detalles para solucionar rapidamente los tests:

- Unexpected value 'undefined' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
  - Se ha puesto un provider en un import.
- Si te indica `No provider for XXX` es que tienes que añadir ese provider, pero fijate bien si puedes añadirlo desde un modulo, por ejemplo:
  - `NullInjectorError: No provider for HttpClient!` no nos interesa agregar HttpClient a los providers, nos interesa agregar el módulo HttpClientTestingModule 
- `app-XXXX is not a known element:` es que falta por añadir el componente a las declarations. Pero aquí ocurre igual que con los providers, puede ser que lo que necesites añadir sea un modulo, por ejemplo:
  - `'mat-card' is not a known element` requiere que añadamos el modulo MatCardModule, no el componente solo.
- Si te indica que está todo resuelto pero tu ves algún error en la consola, resuelve el error, porque muchas veces el error no es determinante para que falle el test.

