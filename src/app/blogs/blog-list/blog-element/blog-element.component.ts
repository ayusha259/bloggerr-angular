import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Blog } from '../../blog.model';
import { BlogService } from '../../blogs.service';

@Component({
  selector: 'app-blog-element',
  templateUrl: './blog-element.component.html',
  styleUrls: ['./blog-element.component.scss'],
})
export class BlogElementComponent implements OnInit, OnDestroy {
  @Input() blog: Blog;
  saved: boolean = false;
  isLoggedIn: boolean = false;
  loggedInSubscription: Subscription;

  saving = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private blogService: BlogService
  ) {}

  handleSave() {
    if (this.saving) return;
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.saving = true;
    this.blogService.saveBlog(this.blog.slug, this.saved).subscribe(() => {
      this.saving = false;
    });
    this.saved = !this.saved;
  }

  ngOnInit(): void {
    this.saved = this.auth.savedBlogs.indexOf(this.blog._id) !== -1;
    this.loggedInSubscription = this.auth.isAuth.subscribe((state) => {
      this.isLoggedIn = state;
    });
  }

  ngOnDestroy(): void {
    this.loggedInSubscription.unsubscribe();
  }
}
