import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TodosComponent } from './todos/todos.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  {path:'videos',component:VideosComponent},
  {path:'addItems',component:TodosComponent},
  {path:'tasks',component:TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
