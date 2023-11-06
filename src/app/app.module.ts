import {
   CUSTOM_ELEMENTS_SCHEMA,
   NO_ERRORS_SCHEMA,
   NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { RootComponent } from './components/root/root.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';

@NgModule({
   declarations: [RootComponent],
   imports: [
      BrowserModule,
      CommonModule,
      AppRoutingModule,
      HttpClientModule,
      TaskListComponent,
      TaskItemComponent,
      DatepickerComponent,
   ],
   providers: [HttpClient],
   bootstrap: [RootComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
