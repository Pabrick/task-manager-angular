import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskManagerMockService } from '../../services/task-manager-mock.service';
import { TaskManagerService } from '../../services/task-manager.service';
import { TaskItemComponent } from './../task-item/task-item.component';
import { TaskListComponent } from './task-list.component';

describe('Component: TaskList', () => {
   let component: TaskListComponent;
   let fixture: ComponentFixture<TaskListComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [TaskListComponent, TaskItemComponent],
         providers: [
            { provide: TaskManagerService, useClass: TaskManagerMockService },
         ],
      }).compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(TaskListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should render', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.task-list h2').textContent).toContain(
         'Task List works!'
      );
   });

   it('should call the load list method', () => {
      fixture = TestBed.createComponent(TaskListComponent);
      component = fixture.componentInstance;
      spyOn(component, 'loadTaskList');
      fixture.detectChanges();

      expect(component.loadTaskList).toHaveBeenCalled();
   });
});
