import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { InfoComponent } from './profile/info/info.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './profile/requests/requests.component';
import { SavedComponent } from './saved/saved.component';
import { UserBlogsComponent } from './user-blogs/user-blogs.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'saved',
        component: SavedComponent,
      },
      {
        path: 'blogs',
        component: UserBlogsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: InfoComponent },
          { path: 'requests', component: RequestsComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
