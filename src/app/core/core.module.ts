import { NgModule } from "@angular/core";
import { RootComponent } from "../root/components/root.component";
import { TranslateModule } from "@ngx-translate/core";
import { ShellComponent } from "./containers/shell/shell.component";
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent
  ],
  imports: [
    TranslateModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule
  ],
  exports: [
    ShellComponent,
    HeaderComponent
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class CoreModule { }
