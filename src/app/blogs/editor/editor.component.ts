import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { map } from 'rxjs';
import { NewBlog } from '../blog.model';
import { BlogService } from '../blogs.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  styles: [
    `
      .NgxEditor__Wrapper {
        border: 1px solid #dee2e6;
        border-radius: 4px;
      }
      .NgxEditor {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border: none;
      }
      .NgxEditor__MenuBar {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
    `,
  ],
})
export class EditorComponent implements OnInit, OnDestroy {
  posting: boolean = false;
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['code'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right'],
  ];
  html = '';
  categories: { label: string; value: string }[] = [];

  @ViewChild('form') form: NgForm;

  constructor(private blogsService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blogsService
      .fetchCategoriesList()
      .pipe(
        map(({ data }) => {
          return data.map((category) => ({
            value: category._id,
            label: category.title,
          }));
        })
      )
      .subscribe((res) => {
        this.categories = res;
      });
    this.editor = new Editor();
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.posting = true;
    const value = this.form.value;
    const data: NewBlog = {
      title: value.title,
      category: value.category,
      image_url: value.image_url,
      body: value.body,
    };
    this.blogsService.postblog(data).subscribe((res) => {
      console.log(res);
      this.posting = false;
      this.router.navigate(['/blogs']);
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
