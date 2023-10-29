import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
      path: 'list',
      loadComponent: () =>
         import('./components/task-list/task-list.component').then(
            (m) => m.TaskListComponent
         ),
   },
   {
      path: '**',
      redirectTo: 'list',
   },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
