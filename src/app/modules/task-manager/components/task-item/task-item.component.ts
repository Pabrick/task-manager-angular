import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../../interfaces/task.interface';
import { TaskActions } from '../../utils/task-actions.const';
import { ITaskAction } from './../../interfaces/task-action.interface';

@Component({
   selector: 'task-item',
   templateUrl: './task-item.component.html',
   styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
   @Input() public data!: ITask;
   @Output() public onActionEmt: EventEmitter<ITaskAction> = new EventEmitter();

   ngOnInit(): void {}

   public onClickDone(task: ITask) {
      const taskDone = {
         ...task,
         done: new Date().toLocaleDateString().replace(/\//g, '-'),
      };
      this.onClickEdit(taskDone);
   }

   public onClickUndone(task: ITask) {
      const taskUndone = {
         ...task,
         done: false,
      };
      this.onClickEdit(taskUndone);
   }

   public onClickEdit(task: ITask) {
      this.onActionEmt.emit({
         action: TaskActions.EDIT,
         task,
      } as ITaskAction);
   }

   public onClickAdd(task: ITask) {
      this.onActionEmt.emit({
         action: TaskActions.ADD,
         task,
      } as ITaskAction);
   }

   public onClickDelete(task: ITask) {
      this.onActionEmt.emit({
         action: TaskActions.DELETE,
         task,
      } as ITaskAction);
   }
}
