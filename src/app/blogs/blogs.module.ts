import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';

import { SharedModule } from '../shared.module';
import { BlogsRoutingModule } from './blogs-routing.module';

import { BlogElementComponent } from './blog-list/blog-element/blog-element.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogComponent } from './blog/blog.component';
import { CommentFormComponent } from './blog/comment-form/comment-form.component';
import { BlogsContainerComponent } from './blogs-container.component';
import { EditorComponent } from './editor/editor.component';
import { HeroComponent } from './hero/hero.component';

@NgModule({
  declarations: [
    BlogComponent,
    BlogsContainerComponent,
    EditorComponent,
    BlogListComponent,
    BlogElementComponent,
    CommentFormComponent,
    HeroComponent,
  ],
  imports: [
    SharedModule,
    BlogsRoutingModule,
    FormsModule,
    NgxEditorModule.forChild({
      locals: {
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
  exports: [BlogElementComponent],
})
export class BlogsModule {}
