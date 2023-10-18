import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ITask } from '../interfaces/task.interface';
import { TaskActions } from '../utils/task-actions.const';
import { MOCK_TASK_LIST } from '../utils/task-list.mock';

@Injectable({
   providedIn: 'root',
})
export class TaskManagerMockService {
   public taskActionMap: Map<TaskActions, any>;

   constructor() {
      this.taskActionMap = new Map();
      this.taskActionMap.set(TaskActions.ADD, (task: any) =>
         this.postTask$(task)
      );
      this.taskActionMap.set(TaskActions.EDIT, (task: any) =>
         this.patchTask$(task)
      );
      this.taskActionMap.set(TaskActions.DELETE, (task: any) =>
         this.deleteTask$(task)
      );
   }

   public getTaskList$(): Observable<ITask[]> {
      return of(MOCK_TASK_LIST).pipe(map((taskList) => taskList.tasks));
   }

   public getTask$(task: ITask): Observable<any> {
      return of({});
   }

   public postTask$(task: ITask): Observable<any> {
      return of({});
   }

   public patchTask$(task: ITask): Observable<any> {
      return of({});
   }

   public deleteTask$(task: ITask): Observable<any> {
      return of({});
   }
}
