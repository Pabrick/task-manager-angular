import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
      path: 'list',
      loadChildren: () =>
         import('./modules/task-manager/task-manager.module').then(
            (m) => m.TaskManagerModule
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
