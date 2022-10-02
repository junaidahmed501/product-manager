import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TreeModule} from "@circlon/angular-tree-component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
