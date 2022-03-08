import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UserinterfaceComponent } from './userinterface/userinterface.component';
import {HttpClientModule} from "@angular/common/http";
import { NotecreationinterfaceComponent } from './notecreationinterface/notecreationinterface.component';
import { NoteupdateinterfaceComponent } from './noteupdateinterface/noteupdateinterface.component';
import { NotedeletioninterfaceComponent } from './notedeletioninterface/notedeletioninterface.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    UserinterfaceComponent,
    NotecreationinterfaceComponent,
    NoteupdateinterfaceComponent,
    NotedeletioninterfaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
