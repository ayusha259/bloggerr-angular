import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogComponent } from './blog/blog.component';
import { BlogsContainerComponent } from './blogs-container.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  {
    path: 'blogs',
    component: BlogsContainerComponent,
    children: [
      { path: '', component: BlogListComponent },
      { path: 'create', component: EditorComponent },
      { path: ':slug', component: BlogComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogsRoutingModule {}
