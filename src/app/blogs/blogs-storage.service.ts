import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Blog } from './blog.model';

export enum StorageKey {
  BLOGS = 'BLOGS',
  USER_BLOGS = 'USER_BLOGS',
}

@Injectable({ providedIn: 'root' })
export class BlogStorageService {
  private storage = new Map<StorageKey, BehaviorSubject<Blog[]>>();

  clearStorage() {
    this.storage.clear();
  }

  getData(key: StorageKey): BehaviorSubject<Blog[]> {
    return this.storage.get(key);
  }

  storeData(key: StorageKey, blogs: Blog[]): void {
    if (!this.storage.get(key)) {
      this.storage.set(key, new BehaviorSubject<Blog[]>([]));
    }
    this.storage.get(key).next(blogs);
  }
}
