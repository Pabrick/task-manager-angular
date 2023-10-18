import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { ITask } from '../../interfaces/task.interface';
import {
   ITaskAction,
   TaskAction$,
} from './../../interfaces/task-action.interface';
import { TaskManagerService } from './../../services/task-manager.service';
import { TaskActions } from '../../utils/task-actions.const';

@Component({
   selector: 'task-list',
   templateUrl: './task-list.component.html',
   styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
   public taskList!: ITask[];
   public newTask: ITask = {
      id: 0,
      label: 'what is the name of this task?',
      description: 'what is this task about?',
      category: 'which category is this task?',
      done: false,
   };
   private _destroy$ = new Subject<void>();

   constructor(private _taskManagerSrv: TaskManagerService) {}

   ngOnInit(): void {
      this._taskManagerSrv
         .getTaskList$()
         .pipe(takeUntil(this._destroy$))
         .subscribe((list) => {
            this.taskList = list;
         });
   }

   ngOnDestroy() {
      this._destroy$.next();
      this._destroy$.complete();
   }

   onTaskAction({ action, task }: ITaskAction): void {
      // This logic is done here to optimize rendering
      const actionIndex = this.taskList.findIndex(({ id }) => id === task.id);
      switch (action) {
         case TaskActions.ADD:
            const lastId = this.getLatestId(this.taskList);
            this.taskList.push({
               ...task,
               id: lastId + 1,
            });
            break;
         case TaskActions.DELETE:
            this.taskList.splice(actionIndex, 1);
            break;
         case TaskActions.EDIT:
         default:
            this.taskList[actionIndex] = task;
            break;
      }

      // This logic update the database
      const taskAction$ = this._taskManagerSrv.taskActionMap.get(
         action
      ) as TaskAction$;

      taskAction$(task).pipe(take(1)).subscribe();
   }

   private getLatestId(list: ITask[]): number {
      const orderedList = [...list];
      orderedList.sort((a, b) => a.id - b.id);
      return orderedList[orderedList.length - 1].id;
   }
}
