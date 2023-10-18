import { Observable } from 'rxjs';
import { TaskActions } from '../utils/task-actions.const';
import { ITask } from './task.interface';

export interface ITaskAction {
   action: TaskActions;
   task: ITask;
}

export type TaskAction$ = (task: ITask) => Observable<unknown>;
