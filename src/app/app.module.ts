import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { RequestInterceptor } from './request-interceptor.service';
import { BlogElementComponent } from './blogs/blog-list/blog-element/blog-element.component';
import { UserBlogsComponent } from './blogs/blog-list/user-blogs/user-blogs.component';
import { LoaderComponent } from './loader.component';
import { BlogComponent } from './blogs/blog/blog.component';
import { BlogsContainerComponent } from './blogs/blogs-container.component';
import { LoginGuard } from './auth/login.guard';
import { AuthGuard } from './auth/auth.guard';
import { EditorComponent } from './blogs/editor/editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { TimeSincePipe } from 'src/shared/time-since.pipe';
import { UserComponent } from './user/user.component';
import { SavedComponent } from './user/saved/saved.component';
import { CommentFormComponent } from './blogs/blog/comment-form/comment-form.component';
import { ResizeDirective } from 'src/shared/resize.directive';
import { ProfileComponent } from './user/profile/profile.component';
import { InfoComponent } from './user/profile/info/info.component';
import { RequestsComponent } from './user/profile/requests/requests.component';
import { RequestElementComponent } from './user/profile/requests/request-element/request-element.component';

const routes: Route[] = [
  { path: '', redirectTo: 'blogs', pathMatch: 'full' },
  {
    path: 'blogs',
    component: BlogsContainerComponent,
    children: [
      { path: '', component: BlogListComponent },
      { path: 'create', component: EditorComponent },
      { path: ':slug', component: BlogComponent },
    ],
  },
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

  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    BlogListComponent,
    BlogElementComponent,
    UserBlogsComponent,
    LoaderComponent,
    BlogComponent,
    BlogsContainerComponent,
    EditorComponent,
    TimeSincePipe,
    UserComponent,
    SavedComponent,
    CommentFormComponent,

    RequestElementComponent,

    ResizeDirective,
    ProfileComponent,
    InfoComponent,
    RequestsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    HttpClientModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        text_color: 'Text Color',
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
