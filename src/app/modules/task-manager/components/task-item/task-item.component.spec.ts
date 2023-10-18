import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ITaskAction } from '../../interfaces/task-action.interface';
import { TaskActions } from '../../utils/task-actions.const';
import { ITask } from '../../interfaces/task.interface';
import { TaskItemComponent } from './task-item.component';

describe('Component: TaskItem', () => {
   let component: TaskItemComponent;
   let fixture: ComponentFixture<TaskItemComponent>;
   let mockData: ITask;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [FormsModule],
         declarations: [TaskItemComponent],
      }).compileComponents();
   });

   beforeEach(() => {
      mockData = {
         id: 1,
         label: 'test label',
         description: 'test description',
         category: 'test category',
         done: '1983-07-26',
      };
      fixture = TestBed.createComponent(TaskItemComponent);
      component = fixture.componentInstance;
      component.data = mockData;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('should', () => {
      let compiled: HTMLElement;
      let inputLabel: HTMLInputElement;
      let inputDescription: HTMLInputElement;
      let inputCategory: HTMLInputElement;

      beforeEach(() => {
         compiled = fixture.nativeElement as HTMLElement;
         inputLabel = compiled.querySelector('#taskLabel') as HTMLInputElement;
         inputDescription = compiled.querySelector(
            '#taskDescription'
         ) as HTMLInputElement;
         inputCategory = compiled.querySelector(
            '#taskCategory'
         ) as HTMLInputElement;
         fixture.detectChanges();
      });

      it('render data', () => {
         fixture.whenStable().then(() => {
            expect(inputLabel.value).toBe(mockData.label);
            expect(inputDescription.value).toBe(mockData.description);
            expect(inputCategory.value).toBe(mockData.category);
         });
      });

      it('bind input text value to component data', () => {
         const newLabel = 'new test label';
         const newDescription = 'new test description';
         const newCategory = 'new test category';

         inputLabel.value = newLabel;
         inputDescription.value = newDescription;
         inputCategory.value = newCategory;

         inputLabel.dispatchEvent(new Event('input'));
         inputDescription.dispatchEvent(new Event('input'));
         inputCategory.dispatchEvent(new Event('input'));

         expect(component.data.label).toBe(newLabel);
         expect(component.data.description).toBe(newDescription);
         expect(component.data.category).toBe(newCategory);
      });

      describe('render task button', () => {
         beforeEach(() => {
            compiled = fixture.nativeElement as HTMLElement;
            inputLabel = compiled.querySelector(
               '#taskLabel'
            ) as HTMLInputElement;
            inputDescription = compiled.querySelector(
               '#taskDescription'
            ) as HTMLInputElement;
            inputCategory = compiled.querySelector(
               '#taskCategory'
            ) as HTMLInputElement;
            fixture.detectChanges();
         });

         it('delete when task has id', () => {
            expect(compiled.querySelector('#btDeleteTask')).toBeTruthy();
            expect(compiled.querySelector('#btCreateTask')).toBeFalsy();
         });

         it('create when task has no id', () => {
            mockData.id = 0;
            component.data = mockData;
            fixture.detectChanges();

            expect(compiled.querySelector('#btDeleteTask')).toBeFalsy();
            expect(compiled.querySelector('#btCreateTask')).toBeTruthy();
         });
      });
   });

   describe('when click', () => {
      let compiled: any;

      beforeEach(() => {
         compiled = fixture.debugElement.nativeElement;
         fixture.detectChanges();
         spyOn(component.onActionEmt, 'emit');
      });

      it('delete should emit delete action', fakeAsync(() => {
         const button = compiled.querySelector('#btDeleteTask');
         const action = {
            action: TaskActions.DELETE,
            task: mockData,
         } as ITaskAction;

         button.click();
         expect(component.onActionEmt.emit).toHaveBeenCalledWith(action);
      }));

      it('create should emit add action', fakeAsync(() => {
         mockData.id = 0;
         component.data = mockData;
         fixture.detectChanges();

         const button = compiled.querySelector('#btCreateTask');
         const action = {
            action: TaskActions.ADD,
            task: mockData,
         } as ITaskAction;

         button.click();
         expect(component.onActionEmt.emit).toHaveBeenCalledWith(action);
      }));
   });
});
