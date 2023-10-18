import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
   CUSTOM_ELEMENTS_SCHEMA,
   NO_ERRORS_SCHEMA,
   NgModule,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@NgModule({
   declarations: [TaskListComponent, TaskItemComponent],
   imports: [CommonModule, HttpClientModule, FormsModule],
   exports: [HttpClientModule, TaskListComponent, TaskItemComponent],
   providers: [HttpClient],
   schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class TaskManagerModule {}
