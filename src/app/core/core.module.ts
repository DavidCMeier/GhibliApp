import { NgModule } from "@angular/core";
import { RootComponent } from "../root/components/root.component";
import { TranslateModule } from "@ngx-translate/core";
import { ShellComponent } from "./containers/shell/shell.component";
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { SharedModule } from "../shared/shared.module";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent
  ],
  imports: [
    TranslateModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    SharedModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    ShellComponent,
    HeaderComponent
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class CoreModule { }
