import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../blog.model';
import { BlogService } from '../blogs.service';
import { HttpClient } from '@angular/common/http';

interface Comment {
  _id: string;
  user: {
    profile: {
      url: string;
      public_id: string;
    };
    _id: string;
    name: string;
    username: string;
  };
  blog: string;
  body: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  loading: boolean = false;
  commentsLoading: boolean = false;
  comments: Comment[] = [];
  blog: Blog;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private blogService: BlogService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ slug }) => {
      this.fetchBlog(slug);
      this.fetchComments(slug);
      console.log(this.comments);
    });
  }

  private fetchComments(slug: string) {
    this.commentsLoading = true;
    this.http
      .get<{ data: Comment[]; status: number }>(`blogs/${slug}/comments`)
      .subscribe((data) => {
        this.comments = data.data;
        this.commentsLoading = false;
      });
  }

  private fetchBlog(slug: string) {
    this.loading = true;
    this.blogService.fetchBlogBySlug(slug).subscribe((blog) => {
      this.blog = blog.data;
      this.loading = false;
    });
  }

  goBack() {
    this.location.back();
  }
}
