import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Blog } from '../../blog.model';
import { BlogService } from '../../blogs.service';

@Component({
  selector: 'app-user-blogs',
  templateUrl: './user-blogs.component.html',
})
export class UserBlogsComponent implements OnInit, OnDestroy {
  loading = false;
  blogsList: Blog[] = [];
  subscription: Subscription;
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.blogService.fetchUserBlogs().subscribe({
      next: (res) => {
        this.blogsList = res;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
