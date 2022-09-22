import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Blog, NewBlog } from './blog.model';
import { BlogStorageService, StorageKey } from './blogs-storage.service';

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(
    private http: HttpClient,
    private blogStorage: BlogStorageService
  ) {}

  fetchAllBlogs() {
    const blogs = this.blogStorage.getData(StorageKey.BLOGS);
    if (blogs) {
      return this.blogStorage.getData(StorageKey.BLOGS).asObservable();
    } else {
      return this.http.get<{ data: Blog[]; status: number }>('blogs').pipe(
        tap((blogs) => {
          this.blogStorage.storeData(StorageKey.BLOGS, blogs.data);
        }),
        map((blogs) => blogs.data)
      );
    }
  }

  fetchUserBlogs() {
    const blogs = this.blogStorage.getData(StorageKey.USER_BLOGS);
    if (blogs) {
      return this.blogStorage.getData(StorageKey.USER_BLOGS).asObservable();
    } else {
      return this.http
        .get<{ data: Blog[]; status: number }>('users/blogs')
        .pipe(
          tap((blogs) => {
            this.blogStorage.storeData(StorageKey.USER_BLOGS, blogs.data);
          }),
          map((blogs) => blogs.data)
        );
    }
  }

  fetchBlogBySlug(slug: string) {
    return this.http.get<{ data: Blog; status: number }>(`blogs/${slug}`);
  }

  fetchCategoriesList() {
    return this.http.get<{
      data: { _id: string; title: string; slug: string }[];
      status: number;
    }>('blogs/category-list');
  }

  postblog(data: NewBlog) {
    return this.http.post('blogs/create', data);
  }

  getSavedBlogs() {
    return this.http.get<{ data: Blog[]; status: number }>('users/savedblogs');
  }

  saveBlog(slug: string, alreadySaved: boolean) {
    return this.http.put(
      `users/savedblogs/${slug}/${alreadySaved ? 'unsave' : 'save'}`,
      {}
    );
  }
}
