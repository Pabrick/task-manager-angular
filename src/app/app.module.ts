import {
   CUSTOM_ELEMENTS_SCHEMA,
   NO_ERRORS_SCHEMA,
   NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskManagerModule } from './modules/task-manager/task-manager.module';
import { CommonModule } from '@angular/common';

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      CommonModule,
      AppRoutingModule,
      HttpClientModule,
      TaskManagerModule,
   ],
   providers: [HttpClient],
   bootstrap: [AppComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
