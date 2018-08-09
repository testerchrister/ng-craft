import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { CraftboardComponent } from './craftboard/craftboard.component';
import { ToolBoxComponent } from './tool-box/tool-box.component';

@NgModule({
  declarations: [
    AppComponent,
    CraftboardComponent,
    ToolBoxComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
