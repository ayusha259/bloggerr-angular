import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { BlogsModule } from '../blogs/blogs.module';
import { UserRoutingModule } from './user-routing.module';

import { InfoComponent } from './profile/info/info.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestElementComponent } from './profile/requests/request-element/request-element.component';
import { RequestsComponent } from './profile/requests/requests.component';
import { SavedComponent } from './saved/saved.component';
import { UserBlogsComponent } from './user-blogs/user-blogs.component';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserBlogsComponent,
    UserComponent,
    SavedComponent,
    RequestsComponent,
    InfoComponent,
    RequestElementComponent,
    ProfileComponent,
  ],
  imports: [SharedModule, UserRoutingModule, BlogsModule, FormsModule],
})
export class UserModule {}
