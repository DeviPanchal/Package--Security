import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ReposComponent } from './repos/repos.component';

const routes: Routes = [
  {path: 'App_component', component: AppComponent},
  { path: 'Repos', component: ReposComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
