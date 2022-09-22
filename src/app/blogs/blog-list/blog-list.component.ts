import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Blog } from '../blog.model';
import { BlogService } from '../blogs.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit, OnDestroy {
  loading = false;
  blogList: Blog[] = [];
  subscription: Subscription;
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.blogService.fetchAllBlogs().subscribe((res) => {
      this.loading = false;
      this.blogList = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
