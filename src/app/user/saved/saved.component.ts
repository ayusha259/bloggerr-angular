import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/blogs/blog.model';
import { BlogService } from 'src/app/blogs/blogs.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
})
export class SavedComponent implements OnInit, OnDestroy {
  savedBlogs: Blog[];
  subscription: Subscription;
  loading = false;
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.blogService.getSavedBlogs().subscribe((blogs) => {
      this.savedBlogs = blogs.data;
      this.loading = false;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
