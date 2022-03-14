import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { ReposComponent } from './repos/repos.component';


const routes: Routes = [
  { path: 'Repos', component: ReposComponent },
  { path: 'Repo-details/:project', component: RepoDetailsComponent },
  { path: '', redirectTo: '/Repos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
