import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskActions } from '../utils/task-actions.const';
import { ITask } from '../interfaces/task.interface';
import { TaskAction$ } from '../interfaces/task-action.interface';

@Injectable({
   providedIn: 'root',
})
export class TaskManagerService {
   public taskActionMap: Map<TaskActions, TaskAction$>;
   private SERVER_URL = 'http://localhost:3000/tasks';

   constructor(private _http: HttpClient) {
      this.taskActionMap = new Map();
      this.taskActionMap.set(TaskActions.ADD, (task: ITask) =>
         this.postTask$(task)
      );
      this.taskActionMap.set(TaskActions.EDIT, (task: ITask) =>
         this.patchTask$(task)
      );
      this.taskActionMap.set(TaskActions.DELETE, (task: ITask) =>
         this.deleteTask$(task)
      );
   }

   public getTaskList$(): Observable<ITask[]> {
      const getURL = `${this.SERVER_URL}`;
      return this._http.get<ITask[]>(getURL);
   }

   public getTask$(task: ITask): Observable<unknown> {
      const getURL = `${this.SERVER_URL}/${task.id}`;
      return this._http.get(getURL);
   }

   public postTask$(task: ITask): Observable<unknown> {
      const postURL = `${this.SERVER_URL}`;
      return this._http.post(postURL, task);
   }

   public patchTask$(task: ITask): Observable<unknown> {
      const patchURL = `${this.SERVER_URL}/${task.id}`;
      return this._http.patch(patchURL, task);
   }

   public deleteTask$(task: ITask): Observable<unknown> {
      const deleteURL = `${this.SERVER_URL}/${task.id}`;
      return this._http.delete(deleteURL);
   }
}
