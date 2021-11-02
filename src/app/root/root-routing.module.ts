import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from '../core/containers/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'search',
        loadChildren: () => import('../features/search/search.module').then(m => m.SearchModule)
      },
      {
        path: 'films',
        loadChildren: () => import('../features/films/films.module').then(m => m.FilmsModule)
      },
      // {
      //   path: 'people',
      //   loadChildren: import('../films/films.module').then(m => m.FilmsModule)
      // },
      {
        path: '**',
        redirectTo: '/search'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
