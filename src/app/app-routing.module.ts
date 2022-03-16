import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { ReposComponent } from './repos/repos.component';


const routes: Routes = [
  { path: '', redirectTo: '/Repos', pathMatch: 'full' },
  { path: 'Repos', component: ReposComponent },
  { path: 'Repo-details/:project', component: RepoDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
